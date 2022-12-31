import prisma from "@/backend/utils/prisma";
export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res
      .status(405)
      .json({ error: `Method '${req.method}' Not Allowed` });
  }
  const { postSlug } = req.query;
  const post = await prisma.Posts.findUnique({
    where: {
      slug: postSlug,
    },
    include: {
      images: true,
      user: true,
    },
  });
  if (post) {
    return res.status(200).json(post);
  } else {
    return res.status(404).json({
      message: "Not found",
    });
  }
}
