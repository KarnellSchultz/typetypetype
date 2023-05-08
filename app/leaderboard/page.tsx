import { ServerLeaderboard } from "app/profile/ServerLeaderboard";

const Page = () => {
    return (
        <section className="w-full" >
            <h1 className="capitalize py-4 text-center" >Leaderboard</h1>
            {/* @ts-expect-error Async Server Component */}
            <ServerLeaderboard type="general" />
        </section>
    )
}
export default Page
