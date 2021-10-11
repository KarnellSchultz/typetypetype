import React from 'react'

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
            <div
              className="px-3 py-1 mr-2 shadow-sm rounded-sm font-semibold text-gray-50 tracking-wider	focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-opacity-50
          bg-indigo-500 hover:bg-indigo-600"
            >
              <a href="#">Test</a>
            </div>
            <div
              className="px-3 py-1 shadow-sm rounded-sm font-semibold text-gray-50 tracking-wider	focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-opacity-50
          bg-indigo-500 hover:bg-indigo-600"
            >
              <a href="#">About</a>
            </div>
          </nav>
        </header>   
        </>
    )
}
