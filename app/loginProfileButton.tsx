'use client'

import { SignedIn, SignedOut } from "@clerk/nextjs/app-beta/client";
import { PageRoutes } from "lib/utils"
import Link from "next/link"


// TODO: move this into the server 
export const LoginProfileButton = () => {
    return (
        <>
            <SignedIn>
                <Link href={PageRoutes.profile}>
                    <button className='bg-gray-200 px-2  py-1 rounded-sm capitalize'>
                        profile
                    </button>
                </Link>
            </SignedIn>
            <SignedOut>
                <Link href={PageRoutes.signIn}>
                    <button className='bg-gray-200 px-2  py-1 rounded-sm capitalize'>
                        sign in
                    </button>
                </Link>
            </SignedOut>
        </>

    )
}
