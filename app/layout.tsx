import React from "react"
import '../styles/globals.css'
import { ClerkProvider } from "@clerk/nextjs/app-beta";
import Link from "next/link";
import { PageRoutes } from "lib/utils";
import { LoginProfileButton } from "./loginProfileButton";

export const metadata = {
    title: 'Home',
    description: 'typetypetype is a typing game',
};

export default async function RootLayout({ children, }: { children: React.ReactNode; }) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body className="w-4/5 mx-auto max-w-xl">
                    <Heading />
                    <Navigation />
                    <main className="flex flex-col justify-center">{children}</main>
                </body>
            </html>
        </ClerkProvider>
    );
}

const Heading = () => <h1 className='text-2xl flex justify-center py-8'>type<span className='text-purple-600'>type</span>type</h1>

const Navigation = () =>
    <nav className='py-8 flex justify-center gap-8'>
        <Link href={PageRoutes.home}>
            <button className='bg-gray-200 px-2  py-1 rounded-sm capitalize'>
                test
            </button>
        </Link>
        <Link href={PageRoutes.leaderboard}>
            <button className='bg-gray-200 px-2  py-1 rounded-sm capitalize '>
                leaderboard
            </button>
        </Link>
        <Link href={PageRoutes.about}>
            <button className='bg-gray-200 px-2  py-1 rounded-sm capitalize'>
                about
            </button>
        </Link>
        <LoginProfileButton />
    </nav>

