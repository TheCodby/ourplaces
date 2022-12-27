"use client";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { useSession, signOut } from "next-auth/react";
import { Menu, Transition } from "@headlessui/react";
import { FaBookmark, FaEdit, FaPlusCircle, FaSignOutAlt } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";

export default function Navbar() {
  const { data: session, status } = useSession();
  return (
    <div className="w-full px-4 md:px-10 h-16">
      <div className="flex flex-row justify-between items-center h-full">
        <div className="flex flex-row space-x-4 items-center">
          <Link
            href="/"
            className="text-2xl font-medium hover:text-emerald-500 transition duration-300"
          >
            OurPlaces
          </Link>
          <div>
            <Menu
              as="div"
              className="relative text-left hidden md:inline-block"
            >
              <div>
                <Menu.Button className="inline-flex w-full items-center justify-center rounded-md text-black px-4 py-2 text-sm font-medium hover:bg-transparent hover:text-emerald-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                  <Image
                    src="/assets/images/flags/us.png"
                    width={20}
                    height={20}
                    alt="us"
                  />
                  <IoMdArrowDropdown />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 mt-2 px-4 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                  <div className="px-1 py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <button className="group bg-transparent justify-center hover:bg-transparent text-black font-light hover:text-emerald-400 flex w-full items-center rounded-md px-2 py-2 text-sm">
                          <Image
                            src="/assets/images/flags/us.png"
                            width={20}
                            height={20}
                            className="mr-1"
                            alt="us"
                          />{" "}
                          English
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
        <div className="flex flex-row space-x-6 items-center">
          <div className="hidden md:block">
            <Link
              href="/explore"
              className="text-md font-bold hover:text-emerald-500 transition duration-300 flex items-center"
            >
              Explore Places
            </Link>
          </div>

          {status === "authenticated" ? (
            <Fragment>
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="inline-flex w-full justify-center items-center rounded-md text-black text-sm font-medium hover:bg-transparent hover:text-emerald-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                    <Image
                      src={session.user.image}
                      width={32}
                      height={32}
                      className="mr-2 rounded-full"
                      alt={session.user.name}
                    />
                    {"   "}
                    <span className="hidden lg:block">{session.user.name}</span>
                    <IoMdArrowDropdown />
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                    <div className="px-1 py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            href="/settings/account"
                            className="group bg-transparent hover:bg-transparent text-black hover:text-emerald-400 flex w-full items-center rounded-md px-2 py-2 text-sm"
                          >
                            <FaEdit className="mr-1" /> Settings
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={() => signOut()}
                            className="group bg-transparent hover:bg-transparent text-black hover:text-emerald-400 flex w-full items-center rounded-md px-2 py-2 text-sm"
                          >
                            <FaBookmark className="mr-1" /> Bookmarks
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                    <div className="px-1 py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={() => signOut()}
                            className="group bg-transparent hover:bg-transparent text-black hover:text-emerald-400 flex w-full items-center rounded-md px-2 py-2 text-sm"
                          >
                            <FaSignOutAlt className="mr-1" /> Sign Out
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
              <div className="hidden md:block">
                <Link
                  href="/new-post"
                  className="emerald-button px-2 rounded-md"
                >
                  {" "}
                  <FaPlusCircle className="lg:mr-2" />{" "}
                  <span className="hidden lg:block">New Post</span>
                </Link>
              </div>
            </Fragment>
          ) : status === "unauthenticated" ? (
            <Link
              href="/auth/sign-in"
              className="text-md font-medium hover:text-emerald-500 transition duration-300"
            >
              Sign in
            </Link>
          ) : status === "loading" ? (
            <div className="animate-pulse w-32 h-6 bg-slate-200 rounded-lg"></div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
