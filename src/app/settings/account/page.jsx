"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { FaDiscord, FaFacebook, FaGoogle, FaTwitter } from "react-icons/fa";
import Loading from "@/app/components/loading";
import Image from "next/image";
import { Fragment } from "react";
import { signIn } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { getMyProviders } from "@/utils/user";

const PROVIDERS = ["discord", "facebook", "twitter", "google"];
const getAvailableProviders = (userProviders) => {
  let availableProviders = [];
  availableProviders = PROVIDERS.filter((value) => {
    return !userProviders.includes(value);
  });
  return availableProviders;
};
export default function Page() {
  /* const {
    isLoading,
    isError,
    data: userProviders,
    error: userProvidersError,
  } = useQuery(["user-providers"], getMyProviders); */
  const { data: session, status } = useSession();
  return (
    <Fragment>
      {status === "loading" ? (
        <Loading />
      ) : (
        <div className="flex flex-col space-x-2 p-6">
          <h1 className="text-2xl lg:text-3xl font-bold">Accounts & Sign-in</h1>
          <div className="flex items-center my-5">
            <Image
              src={session?.user?.image}
              width={100}
              height={100}
              className="mr-2 rounded-full border-4 border-emerald-400"
              alt={session?.user?.name}
            />
            <dl>
              <dd className="text-lg">{session?.user?.name}</dd>
              <dt className="text-sm text-gray-500">Member</dt>
            </dl>
          </div>
          {/* {isError ? (
            <span className="text-lg">{userProvidersError}</span>
          ) : isLoading ? (
            <Loading />
          ) : (
            <Fragment>
              <dl>
                <dd>
                  <h2>
                    You have linked your account with {userProviders.length}{" "}
                    providers
                  </h2>
                </dd>
                <dt>
                  <div className="flex flex-row space-x-4 mt-2">
                    {userProviders.map((value, index) => (
                      <button
                        key={value}
                        disabled
                        className="bg-emerald-400 border-gray-100 p-3 hover:bg-emerald-400 transition-none rounded-full text-white inline-flex items-center justify-center text-base"
                      >
                        {value === "facebook" ? (
                          <FaFacebook className="text-xl" />
                        ) : value === "discord" ? (
                          <FaDiscord className="text-xl" />
                        ) : value === "twitter" ? (
                          <FaTwitter className="text-xl" />
                        ) : value === "google" ? (
                          <FaGoogle className="text-xl" />
                        ) : (
                          ""
                        )}
                      </button>
                    ))}
                  </div>
                </dt>
              </dl>
              {PROVIDERS.length > 0 && (
                <dl>
                  <dd>
                    <h1 className="text-xl font-medium mt-5">
                      Link your account with
                    </h1>
                  </dd>
                  <dt>
                    <div className="flex flex-row space-x-4 mt-2">
                      {getAvailableProviders(userProviders).map(
                        (value, index) => (
                          <button
                            key={value}
                            onClick={() => signIn(value)}
                            className="bg-gray-200 border-gray-100 p-3 hover:bg-gray-300 transition-none rounded-full text-black inline-flex items-center justify-center text-base"
                          >
                            {value === "facebook" ? (
                              <FaFacebook className="text-xl" />
                            ) : value === "discord" ? (
                              <FaDiscord className="text-xl" />
                            ) : value === "twitter" ? (
                              <FaTwitter className="text-xl" />
                            ) : value === "google" ? (
                              <FaGoogle className="text-xl" />
                            ) : (
                              ""
                            )}
                          </button>
                        )
                      )}
                    </div>
                  </dt>
                </dl>
              )}
            </Fragment>
          )} */}
        </div>
      )}
    </Fragment>
  );
}
