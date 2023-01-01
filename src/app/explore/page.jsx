"use client";
import Image from "next/image";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Loading from "@/app/components/loading";
import { FaEye } from "react-icons/fa";
import axios from "axios";
import { useState } from "react";
import Link from "next/link";
const shimmer = (w, h) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#f0f0f0" offset="20%" />
      <stop stop-color="#fff" offset="50%" />
      <stop stop-color="#f0f0f0" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#f0f0f0" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;
const toBase64 = (str) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);
export default function Page() {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [allLoaded, setAllLoaded] = useState(false);
  const {
    isLoading,
    isError,
    data: posts,
    error,
  } = useQuery(["posts"], async () => {
    try {
      const data = await axios.get("/api/posts").then((r) => r.data);
      if (!data) {
        throw new Error("Failed to fetch posts");
      }

      return data;
    } catch (e) {
      throw new Error("Failed to fetch posts");
    }
  });
  const mutation = useMutation(
    async () => {
      try {
        const data = await axios
          .get(`/api/posts?from=${posts[posts.length - 1].id}`)
          .then((r) => r.data);
        if (!data) {
          throw new Error("Failed to fetch posts");
        }
        return data;
      } catch (e) {
        throw new Error("Failed to fetch posts");
      }
    },
    {
      onMutate: () => {
        setLoading(true);
      },
      onSuccess: (data) => {
        queryClient.setQueryData(["posts"], (oldData) => {
          if (data.length === 0) setAllLoaded(true);
          return [...oldData, ...data];
        });
      },
      onSettled: () => {
        setLoading(false);
      },
    }
  );
  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <h1>{error}</h1>;
  }
  if (!posts) {
    return <h1>Failed to fetch posts</h1>;
  }
  return (
    <section className="flex p-10 justify-center xl:justify-start mb-12 overflow-hidden">
      <div className="xl:basis-2/3 space-y-10">
        {posts.map((post) => (
          <Link
            href={`/posts/${post.slug}`}
            className="flex flex-col xl:flex-row w-full border box-border overflow-hidden rounded-md shadow-sm"
            key={post.id}
          >
            <div className="relative w-full h-80">
              <Image
                src={`https://s3.amazonaws.com/ourplaces/${post.images[0].key}`}
                fill
                placeholder="blur"
                blurDataURL={`data:image/svg+xml;base64,${toBase64(
                  shimmer(320, 320)
                )}`}
                style={{ objectFit: "cover" }}
                alt="Pyramids"
              />
            </div>
            <div className="flex flex-col p-4 justify-between xl:w-full">
              <div>
                <h1 className="text-2xl" style={{ color: "#141414" }}>
                  {post.title}
                </h1>
                <div className="mt">
                  <span className="text-gray-300 text-sm">
                    By{" "}
                    <span className="text-emerald-400">{post.user.name}</span>
                  </span>
                </div>
                <hr className="my-3" />
                <h2 className="text-sm xl:mr-10">{post.description}</h2>
                {/* <div className="flex flex-wrap text-sm gap-1">
                  <span className="text-blue-500">#Egypt</span>
                  <span className="text-blue-500">#Pyramids</span>
                  <span className="text-blue-500">#Lorem</span>
                  <span className="text-blue-500">#Photographing</span>
                  <span className="text-blue-500">#Pharaoh</span>
                </div> */}
              </div>
              <div className="flex flex-col">
                <div className="flex justify-between flex-row-reverse text-sm mt-6">
                  <span className="text-gray-400 flex items-center space-x-1 self-end">
                    <FaEye /> <span className="font-medium">{post.views}</span>
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
        {}
        {loading ? (
          <Loading />
        ) : !allLoaded ? (
          <div className="text-center">
            <button onClick={() => mutation.mutate()}>Load More</button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
