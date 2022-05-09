import React from "react";
import Link from "next/link";

export const Header = () => {
  return (
    <>
      <header>
        <h1 className=" py-6 text-2xl font-semibold">
          <span>type</span>
          <span className="text-indigo-700">type</span>
          <span>type</span>
        </h1>
        <nav className="grid grid-cols-2 mb-8">
          <div>
            <Link href="/">
              <a
                className="px-3 py-1 mr-2 shadow-sm rounded-sm font-semibold text-gray-50 hover:text-white tracking-wider	
                  focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-opacity-50
                bg-indigo-500 hover:bg-indigo-600"
              >
                Test
              </a>
            </Link>
          </div>
          <div>
            <Link href="/about">
              <a
                className="px-3 py-1 shadow-sm rounded-sm font-semibold text-gray-50 hover:text-white tracking-wider	
            focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-opacity-50
          bg-indigo-500 hover:bg-indigo-600"
              >
                About
              </a>
            </Link>
          </div>
        </nav>
      </header>
    </>
  );
};

// yooo
