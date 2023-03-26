"use client";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

export const SignIn = () => {
    const { isLoaded, isSignedIn, user } = useUser();

    if (!isLoaded || !isSignedIn) {
        return (
            <Link href={'/sing-in'}  >
                <button className="p-2 bg-blue-400 rounded-md" type="button">
                    sign in
                </button>
            </Link>
        )
    }

    return <div>Hello, {user.firstName} welcome to Clerk</div>;
}