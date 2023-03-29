'use client'

import { UserButton } from "@clerk/clerk-react";
import { UsersLeaderboard } from "app/leaderboard";

const Page = () => {
    return (
        <div className=''>
            <h1 className="text-xl" >Data going in here</h1>
            <section>
                <div>Profile:</div>
                <UserButton />
            </section>
            <UsersLeaderboard />
        </div>
    )
}
export default Page
