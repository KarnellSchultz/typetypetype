import { UserButton, UserProfile } from '@clerk/nextjs/app-beta';
import { UsersLeaderboard } from "app/leaderboard";

const Page = () => {
    return (
        <div className='w-full'>
            <section className='py-8'>
                <h1 className="text-xl" >Profile</h1>
                <UserCard />
            </section>
            <section className='py-8'>
                <UsersLeaderboard />
            </section>
        </div>
    )
}
export default Page

const UserCard = () => {
    return (
        <div className='bg-gray-200 rounded-md'>
            <UserButton showName afterSignOutUrl='/' />
        </div>
    )
}