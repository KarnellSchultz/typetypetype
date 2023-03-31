import { ServerLeaderboard } from "app/profile/ServerLeaderboard";

const Page = () => {
    return (
        <section className="w-full" >
            <h1 className="text-xl text-center" >🚧All time leaderboard 🚧</h1>
            {/* @ts-expect-error Async Server Component */}
            <ServerLeaderboard type="general" />
        </section>
    )
}
export default Page
