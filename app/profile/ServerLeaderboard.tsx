
import prisma from 'lib/prisma';
import { auth } from '@clerk/nextjs/app-beta';
import { Leaderboard } from 'app/leaderboard';


const getUserGames = async () => {
    const { userId } = auth();
    if (!userId) return []
    const games = await prisma.game.findMany({
        where: {
            userId,
        },
        take: 20,
        orderBy: {
            wpm: 'desc',
        },
    })
    return games.map((game) => ({
        ...game, createdAt: game.takenAt.toLocaleDateString(),
        takenAt: game.takenAt.toLocaleDateString()
    }))
}
const getGamesData = async () => {
    const gamesData = await prisma.game.findMany({
        take: 30,
        orderBy: { wpm: 'desc' },
    })
    return gamesData.map((game) => ({
        ...game, createdAt: game.takenAt.toLocaleDateString(),
        takenAt: game.takenAt.toLocaleDateString()
    }))
}


type Props = {
    type?: 'user' | "general"
}
export async function ServerLeaderboard({ type = "general" }: Props) {
    const games = type === "user" ? await getUserGames() : await getGamesData()
    return <Leaderboard games={games} />
}