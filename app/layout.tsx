import React from "react"
import '../styles/globals.css'
import { ClerkProvider, currentUser } from "@clerk/nextjs/app-beta";
import Link from "next/link";
import { User } from "@clerk/nextjs/dist/api";


export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body>
                    <Heading />
                    {/* https://beta.nextjs.org/docs/configuring/typescript#async-server-component-typescript-error */}
                    {/* @ts-expect-error Async Server Component */}
                    <Navigation />
                    <main className="w-4/5 mx-auto max-w-xl" >{children}</main>
                </body>
            </html>
        </ClerkProvider>
    );
}

export const metadata = {
    title: 'Home',
    description: 'typetypetype is a typing game',
};


const Heading = () => {
    return (
        <h1 className='text-2xl flex justify-center py-8'>type<span className='text-purple-600'>type
        </span>
            type</h1>
    )
}

const PageRoutes = {
    home: '/',
    about: '/about',
    signIn: '/sign-in',
    signUp: '/sign-up',
    profile: '/profile',
    leaderboard: '/leaderboard',
} as const

type TPageRoutes = typeof PageRoutes[keyof typeof PageRoutes]

const Navigation = async () => {
    const user: User | null = await currentUser()
    return (
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
            <UserProfileButton user={user} />
        </nav>
    )
}

const UserProfileButton = ({ user }: { user: User | null }) => {
    if (user) {
        return (
            <Link href={PageRoutes.profile}>
                <button className='bg-gray-200 px-2  py-1 rounded-sm capitalize'>
                    profile
                </button>
            </Link>
        )
    }
    return (
        <Link href={PageRoutes.signIn}>
            <button className='bg-gray-200 px-2  py-1 rounded-sm capitalize'>
                sign in
            </button>
        </Link>
    )
}