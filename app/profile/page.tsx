import { UserButton } from '@clerk/nextjs/app-beta';
import { ServerLeaderboard } from './ServerLeaderboard';


const Page = async () => {
    return (
        <div className='w-full'>
            <section className='text-center'>
                <h1 className="text-xl py-4 capitalize" >Profile</h1>
                <UserCard />
            </section>
            <section className='py-4'>
            <h1 className="text-xl py-4 text-center capitalize" >Your Leaderboard</h1>
                {/* @ts-expect-error Async Server Component */}
                <ServerLeaderboard type="user" />
            </section>
        </div>
    )
}
export default Page

const UserCard = () => {
    return (
        <div className='flex justify-center'>
            <div className='text-xl  rounded-sm bg-gray-200 px-4 py-2' >
                <UserButton showName afterSignOutUrl='/' />
            </div>
        </div>
    )
}