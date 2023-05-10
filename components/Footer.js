import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer id="site-footer" className=" bg-slate-200">
      <div className="flex justify-between items-center container mx-auto lg:max-w-5xl">
        <div className="py-3"> &copy; 2023 - CoolNomad all rights reserved</div>
        <ul className="flex [&>li>a]:px-2">
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/privacy-policy">Privacy-policy</Link>
          </li>
          <li>
            <Link href="/sample-page">Sample Page</Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
