import prisma from "@/backend/utils/prisma";
import { authOptions } from "../auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth";
export default async function handler(req, res) {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ error: `Method '${req.method}' Not Allowed` });
  }
  try {
    const { title, description, images, tags } = JSON.parse(req.body);
    // check if slug avaliable, if not avaliable add Data.now() at the end of the slug.
    let slug = title.replace(" ", "-");
    const isSlugUsed = await prisma.Posts.findUnique({
      where: {
        slug,
      },
    });
    if (isSlugUsed) {
      slug += "-" + Date.now().toString();
    }
    const postData = {
      userId: session.userId,
      title,
      tags,
      slug,
      description,
    };
    const post = await prisma.Posts.create({
      data: postData,
    });
    await prisma.Uploads.updateMany({
      where: {
        id: { in: images },
      },
      data: {
        postId: post.id,
      },
    });
    return res
      .status(200)
      .json({ message: "Sucessfully create post", post_id: post.id });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ message: e });
  }
}
