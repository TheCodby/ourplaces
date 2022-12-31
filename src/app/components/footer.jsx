import Link from "next/link";

export default function Footer() {
  return (
    <section className="bg-gray-200 h-24 footer flex flex-col justify-center px-10">
      <div className="flex flex-row justify-between">
        <Link href="/" className="text-lg">
          Created by <span className="text-emerald-800">Codby</span>
        </Link>
        <div className="flex space-x-5">
          <Link
            href="/terms-conditions"
            className="text-md hover:text-neutral-700"
          >
            Terms of Service
          </Link>
          <Link
            href="/privacy-policy"
            className="text-md hover:text-neutral-700"
          >
            Privacy Policy
          </Link>
        </div>
        <span className="text-md">© 2023 Codby, All rights reserved.</span>
      </div>
    </section>
  );
}
