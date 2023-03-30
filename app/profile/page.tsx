import { UserButton, UserProfile } from '@clerk/nextjs/app-beta';
import { UsersLeaderboard } from "app/leaderboard";

const Page = () => {
    return (
        <div className=''>
            <h1 className="text-xl" >Data going in here</h1>
            <section>
                <UserCard />
            </section>
            <UsersLeaderboard />
        </div>
    )
}
export default Page

const UserCard = () => {
    return (
        <div className='bg-gray-200 rounded-md p-4'>
            <UserButton showName afterSignOutUrl='/' />
        </div>
    )
}