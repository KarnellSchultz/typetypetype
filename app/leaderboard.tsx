'use client'
import useSWR, { Fetcher } from 'swr'
import { useUser } from "@clerk/nextjs"
import { Api, TGame } from 'lib/utils'

export const getGames = (url: string): Promise<{ games: TGame[] }> => fetch(url).then(res => res.json())

export const UsersLeaderboard = () => {
    const { user } = useUser()
    const { data, error, isLoading } = useSWR(Api.Routes.gamesId(user?.id ?? ""), getGames)

    if (!user) return null

    return (
        <div>
            <div className='text-xl text-cyan-600'>Leaderboard</div>
            {isLoading && <div>Loading...</div>}
            {error && <div>Error</div>}

            {data && data.games &&
                data.games.map((game) => {
                    return (
                        <div className='p-2 mt-2 bg-lime-100 rounded-md' key={game.id}>
                            <div>id:{game.id}</div>
                            <div>score:{game.wpm}
                                <div>time:{game.duration}</div>
                                <div>userId:{game.userId}</div>
                            </div>
                        </div>

                    )
                })
            }
        </div >
    )
}

export const Leaderboard = () => {
    const { data, error, isLoading } = useSWR(Api.Routes.games, getGames)

    if (!data) return null

    return (
        <section className='py-4 flex justify-center flex-col'>
            <h3 className='text-xl text-center'>Leaderboard</h3>
            {error && <div>Error</div>}
            {isLoading && <div>Loading...</div>}
            <table className='table-auto'>
                <thead>
                    <tr>
                        <th className='border px-4 py-2 text-left'>rank</th>
                        <th className='border px-4 py-2 text-left '>wpm</th>
                        <th className='border px-4 py-2 text-left'>username</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.games && data.games.map((game, idx) => {
                        return (
                            <tr key={game.id}>
                                <td className='border px-4 py-2 text-left'>{idx + 1}</td>
                                <td className='border px-4 py-2 text-left'>{game.wpm}</td>
                                <td className='border px-4 py-2 text-left'>{game.userName}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </section>)

}
