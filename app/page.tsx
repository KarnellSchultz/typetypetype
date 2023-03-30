import prisma from 'lib/prisma';
import { TypingGame } from './typingGame';


const getGamesData = async () => {
    const gamesData = await prisma.game.findMany({})
    return gamesData.map((game) => ({
        ...game, createdAt: game.takenAt.toDateString(),
        takenAt: game.takenAt.toDateString()
    }))
}

const Home = async () => {
    const [games] = await Promise.all([getGamesData()])
    return <TypingGame games={games} />
}
export default Home

