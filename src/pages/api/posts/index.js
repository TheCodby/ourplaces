const ITEMS_PER_PAGE = 10;
export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res
      .status(405)
      .json({ error: `Method '${req.method}' Not Allowed` });
  }
  let cursorId = req.query["from"];
  if (!cursorId) {
    const firstPost = await prisma.Posts.findFirst();
    cursorId = firstPost.id;
  }
  const posts = await prisma.Posts.findMany({
    take: ITEMS_PER_PAGE,
    skip: !req.query["from"] ? 0 : 1,
    cursor: {
      id: cursorId,
    },
    orderBy: {
      id: "asc",
    },
    include: {
      images: true,
    },
  });
  return res.status(200).json(posts);
}
