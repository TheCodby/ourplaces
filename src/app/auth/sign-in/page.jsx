"use client";
import { FaDiscord, FaFacebook, FaGoogle, FaTwitter } from "react-icons/fa";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { status } = useSession();
  const router = useRouter();
  if (status === "authenticated") {
    router.push(`/`);
  } else if (status === "unauthenticated") {
    return (
      <div className="flex flex-col justify-center items-center absolute h-full w-full bg-slate-100">
        <div className="shadow-sm rounded-lg flex flex-col p-5 bg-white space-y-4 w-full md:w-2/4 lg:w-2/4 xl:w-1/4 text-center border-x-neutral-600">
          <span className="text-2xl font-light">Welcome again! ✋ </span>
          <span className="text-md font-light text-gray-500">Sign in with</span>
          <div className="grid lg:grid-cols-2 gap-3">
            <button
              onClick={() => signIn("discord")}
              className="bg-gray-200 border-gray-100 p-3 hover:bg-gray-300 transition-none rounded-md text-black inline-flex items-center justify-center text-base"
            >
              <FaDiscord className="mr-2 text-xl" /> Discord
            </button>
            <button
              onClick={() => signIn("facebook")}
              className="bg-gray-200 border-gray-100 p-3 hover:bg-gray-300 transition-none rounded-md text-black inline-flex items-center justify-center text-base"
            >
              <FaFacebook className="mr-2 text-xl" /> Facebook
            </button>
            <button
              onClick={() => signIn("twitter")}
              className="bg-gray-200 border-gray-100 p-3 hover:bg-gray-300 transition-none rounded-md text-black inline-flex items-center justify-center text-base"
            >
              <FaTwitter className="mr-2 text-xl" /> Twitter
            </button>
            <button
              onClick={() => signIn("google")}
              className="bg-gray-200 border-gray-100 p-3 hover:bg-gray-300 transition-none rounded-md text-black inline-flex items-center justify-center text-base"
            >
              <FaGoogle className="mr-2 text-xl" /> Google
            </button>
          </div>
        </div>
      </div>
    );
  }
}
