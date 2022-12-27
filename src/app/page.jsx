"use client";
import Image from "next/image";
import classes from "./styles/Home.module.css";
import { FaEye, FaMousePointer, FaLock } from "react-icons/fa";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function HomePage() {
  const { status } = useSession();
  return (
    <div className={classes.main}>
      <section
        className="px-32"
        style={{
          height: "70vh",
        }}
      >
        <div className="flex flex-col lg:flex lg:flex-row justify-center lg:justify-between items-center my-20 relative">
          <div className="text-center flex flex-col space-y-3">
            <span className="text-4xl lg:text-5xl font-extrabold tracking-tight">
              Share your favorite places <br /> with <span>OurPlaces 📸</span>
            </span>
            {status === "unauthenticated" && (
              <div>
                <Link href="/auth/sign-in" className="text-xl emerald-button">
                  Join us
                </Link>
              </div>
            )}
          </div>
          <div>
            <Image
              src="/assets/images/illustrations/viewer-bro.svg"
              width={500}
              height={500}
              className="h-56 lg:h-auto"
              alt="viewer-pro"
              priority
            />
          </div>
        </div>
      </section>
      <section
        className="h-auto py-16 lg:py-24 text-black max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        style={{ clipPath: "ellipse(117% 100% at 49.33% 100%)" }}
      >
        <div className="flex flex-col justify-center lg:justify-between items-center">
          <div className="text-center flex flex-col">
            <span className="text-4xl font-extrabold leading-8 tracking-tighter">
              Community to share beautiful places around the world
            </span>
            <span className="text-2xl text-gray-800 font-medium">
              The world has become a global village!
            </span>
          </div>
          <div className="lg:grid lg:grid-cols-2 lg:items-center lg:gap-8 mt-16">
            <div className="flex flex-col space-y-10">
              <div className="flex flex-col text-center lg:text-start lg:flex-row space-x-3 items-center lg:items-start">
                <div className="rounded bg-emerald-400 p-4 text-white text-2xl">
                  <FaEye />
                </div>
                <div>
                  <dt className="text-2xl text-black font-medium">
                    Keeps you informed everywhere
                  </dt>
                  <dd className="text-sm text-gray-500 font-light mt-1">
                    Now you can visit many places around the world from behind
                    your screen, everything is possible.
                  </dd>
                </div>
              </div>
              <div className="flex flex-col text-center lg:text-start lg:flex-row space-x-3 items-center lg:items-start">
                <div className="rounded bg-emerald-400 p-4 text-white text-2xl">
                  <FaMousePointer />
                </div>
                <div>
                  <dt className="text-2xl text-black font-medium">
                    Easier than you think
                  </dt>
                  <dd className="text-sm text-gray-500 font-light mt-1">
                    {`We offer the best experience to our users in OurPlaces, It's
                    a doddle!`}
                  </dd>
                </div>
              </div>
              <div className="flex flex-col text-center lg:text-start lg:flex-row space-x-3 items-center lg:items-start">
                <div className="rounded bg-emerald-400 p-4 text-white text-2xl">
                  <FaLock />
                </div>
                <div>
                  <dt className="text-2xl text-black font-medium">
                    Safety First
                  </dt>
                  <dd className="text-sm text-gray-500 font-light mt-1">
                    We care about the safety of users, and the safety of
                    non-users also by blurring persons in images.
                  </dd>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
