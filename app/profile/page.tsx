'use client'

export const config = {
    runtime: 'edge',
}

import { UserButton } from "@clerk/clerk-react";

const Page = () => {
    return (
        <div className=''>
            <h1 className="text-xl" >Data going in here</h1>
            <section>
                <div>Profile:</div>
                <UserButton />
            </section>

        </div>
    )
}
export default Page
