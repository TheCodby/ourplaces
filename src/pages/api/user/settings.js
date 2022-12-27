import { authOptions } from "../auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth";
import { getUserSettings } from "@/backend/utils/user";
import prisma from "@/backend/utils/prisma";
export default async function handler(req, res) {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  if (req.method === "GET") {
    const settings = await getUserSettings(session.userId);
    res.status(200).json(settings);
  } else if (req.method === "PATCH") {
    const data = JSON.parse(req.body.data);
    const setting_name = data.setting_name;
    const setting_value = data.setting_value;
    try {
      await prisma.Settings.upsert({
        where: {
          userId_key: {
            userId: session.userId,
            key: setting_name,
          },
        },
        update: {
          value: setting_value,
        },
        create: {
          userId: session.userId,
          key: setting_name,
          value: setting_value,
        },
      });
      const settings = await getUserSettings(session.userId);
      console.log(settings);
      return res.status(200).json({
        message: "Successfully updated settings",
        settings,
      });
    } catch (e) {
      return res.status(422).json({ message: e.message });
    }
  }
}
