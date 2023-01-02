export const revalidate = 60;
import prisma from "@/backend/utils/prisma";
import { notFound } from "next/navigation";
import ImagesList from "./images-list";
async function getPost(postSlug) {
  const res = await fetch(
    `https://our-places.vercel.app/api/posts/${postSlug}`
  );
  if (!res.ok) return undefined;
  return res.json();
}
export default async function PostPage({ params }) {
  const post = await getPost(params.postSlug);
  if (!post) return notFound();
  await prisma.Posts.update({
    where: {
      id: post.id,
    },
    data: {
      views: {
        increment: 1,
      },
    },
  });
  return (
    <section className="px-10 mt-10 pb-24">
      <div className="flex flex-col space-y-3">
        <div className="flex flex-row space-x-4">
          <div className="flex flex-col space-y-4">
            <ImagesList images={post.images} />
          </div>
          <div className="flex flex-col space-y-4 basis-1/2">
            <span className="text-2xl">{post.title}</span>
            <span className="text-md">{post.description}</span>
            <div className="flex flex-wrap text-sm gap-1">
              {post.tags.map((tag) => (
                <span className="text-blue-500">#{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
