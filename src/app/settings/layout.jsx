"use client";
import Link from "next/link";
import React from "react";
import { FaUser } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";
import { useSelectedLayoutSegment } from "next/navigation";
import { useSession } from "next-auth/react";
const routes = [
  {
    name: "account",
    icon: <FaUser />,
    path: "/settings/account",
  },
  {
    name: "notifications",
    icon: <IoMdNotifications />,
    path: "/settings/notifications",
  },
];
export default function Layout({ children }) {
  const { status } = useSession({ required: true });
  const segment = useSelectedLayoutSegment();
  if (status === "authenticated") {
    return (
      <section className="p-5 flex flex-col lg:flex-row lg:space-x-4 gap-3">
        <div className="basis-1/4 flex flex-col space-y-3">
          {routes.map((tab) => (
            <Link
              key={tab.name}
              href={tab.path}
              aria-current={segment == tab.name}
              className={`${
                segment == tab.name && "bg-gray-200"
              } font-medium transition duration-300 flex items-center space-x-2 w-full text-black hover:bg-gray-300 rounded-lg p-2 justify-start`}
            >
              {tab.icon}{" "}
              <span>
                {tab.name.charAt(0).toUpperCase() + tab.name.slice(1)}
              </span>
            </Link>
          ))}
        </div>
        <div className="basis-3/4 rounded-lg shadow-sm bg-gray-100">
          {children}
        </div>
      </section>
    );
  }
}
