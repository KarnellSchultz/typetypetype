'use client'
import useSWR, { Fetcher } from 'swr'
import { useUser } from "@clerk/nextjs"
import { Api, TGame } from 'lib/utils'

export const getGames = (url: string): Promise<{ games: TGame[] }> => fetch(url).then(res => res.json())

export const UsersLeaderboard = () => {
    const { user } = useUser()
    const { data, error, isLoading } = useSWR(Api.Routes.gamesId(user?.id ?? ""), getGames)

    if (!user) return null

    if (isLoading) return <div>loading...</div>
    if (error) return <div>error</div>

    return (
        <div>
            <div className='text-xl text-center py-8'>Your Leaderboard</div>
            <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-700 capitalize bg-gray-50">
                    <tr className='rounded-sm'>
                        <th className='px-4 py-2'>rank</th>
                        <th className='px-4 py-2'>user</th>
                        <th className='px-4 py-2 '>wpm</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.games && data.games.map((game, idx) => {
                        const rank = idx + 1
                        return (
                            <tr key={game.id}
                                className={`border-b border-gray-200 rounded-sm
                                 ${idx % 2 === 0 ? "bg-white" : "bg-gray-100"}`}
                            >
                                <td className=' px-4 py-2'>{rank}</td>
                                <td className=' px-4 py-2'>{game.userName}</td>
                                <td className=' px-4 py-2'>{game.wpm}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div >
    )
}

export const Leaderboard = () => {
    const { data, error, isLoading } = useSWR(Api.Routes.games, getGames)

    if (!data) return null

    if (isLoading) return <div>loading...</div>
    if (error) return <div>error</div>

    return (
        <div className='py-8 flex justify-center flex-col'>
            <h3 className='text-xl text-center'>Leaderboard</h3>
            <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-700 capitalize bg-gray-50">
                    <tr className='rounded-sm'>
                        <th className='px-4 py-2'>rank</th>
                        <th className='px-4 py-2'>user</th>
                        <th className='px-4 py-2 '>wpm</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.games && data.games.map((game, idx) => {
                        const rank = idx + 1
                        return (
                            <tr key={game.id}
                                className={`border-b border-gray-200 rounded-sm
                                 ${idx % 2 === 0 ? "bg-white" : "bg-gray-100"}`}
                            >
                                <td className=' px-4 py-2'>{rank}</td>
                                <td className=' px-4 py-2'>{game.userName}</td>
                                <td className=' px-4 py-2'>{game.wpm}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>)

}
