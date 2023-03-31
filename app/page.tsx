import { ServerLeaderboard } from './profile/ServerLeaderboard';
import { TypingGame } from './typingGame';

const Home = () => {
    return (
        <>
            <TypingGame />
            <section className='py-4 w-full'>
                <h1 className='text-xl capitalize text-center py-4'>leaderboard</h1>
                {/* @ts-expect-error Async Server Component */}
                <ServerLeaderboard />
            </section>
        </>
    )
}
export default Home

