import { ServerLeaderboard } from "app/profile/ServerLeaderboard";

const Page = () => {
    return (
        <div className=''>
            <h1 className="text-xl text-center" >🚧All time leaderboard 🚧</h1>
            <section>
                {/* @ts-expect-error Async Server Component */}
                <ServerLeaderboard type="general" />
            </section>
        </div>
    )
}
export default Page
