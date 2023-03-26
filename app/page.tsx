import prisma from 'lib/prisma';
import { SignIn } from './signIn'
import { TypingGame } from './typingGame';


const getGamesData = async () => {
    const gamesData = await prisma.game.findMany({})
    return gamesData.map((game) => ({ ...game, createdAt: game.createdAt.toDateString(), updatedAt: game.updatedAt.toDateString() }))
}

const Home = async () => {
    const [games] = await Promise.all([getGamesData()])
    return (
        <div className=''>
            <TypingGame games={games} />
            <section>
                <div>account:</div>
                <SignIn />
            </section>
        </div>
    )
}
export default Home

