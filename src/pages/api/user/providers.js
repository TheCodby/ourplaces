import prisma from "@/backend/utils/prisma";
import { authOptions } from "../auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth";
export default async function handler(req, res) {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  if (req.method === "GET") {
    const userProvidersRes = await prisma.Account.findMany({
      where: {
        userId: session.userId,
      },
      select: {
        provider: true,
      },
    });
    const userProviders = [];
    for (var i in userProvidersRes)
      userProviders.push(userProvidersRes[i].provider);
    return res.status(200).json(userProviders);
  }
}
