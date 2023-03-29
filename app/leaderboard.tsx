import useSWR from 'swr'
import { useUser } from "@clerk/nextjs"

export const getGames = (url: string) => fetch(url).then(res => res.json())

export const UsersLeaderboard = () => {
    const { user } = useUser()
    const { data, error, isLoading } = useSWR(`/api/games/${user?.id}`, getGames)

    if (!user) return null

    return (
        <div>
            <div className='text-xl text-cyan-600'>Leaderboard</div>
            {isLoading && <div>Loading...</div>}
            {error && <div>Error</div>}

            {data && data.games &&
                data.games.map((game: any) => {
                    return (
                        <div className='p-2 mt-2 bg-lime-100 rounded-md' key={game.id}>
                            <div>id:{game.id}</div>
                            <div>score:{game.score}
                                <div>time:{game.time}</div>
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
    const { data, error, isLoading } = useSWR(`/api/games`, getGames)
    
    if (!data) return null

    console.log(data);
    
    
    return data.games.map((game: any) => {
        return (
            <div key={game.id}>
                {error && <div>Error</div>}
                {isLoading && <div>Loading...</div>}
                <div className='p-2 mt-2 bg-lime-100 rounded-md'>
                    <div>id:{game.id}</div>
                    <div>score:{game.score}
                        <div>time:{game.time}</div>
                        <div>userId:{game.userId}</div>
                    </div>
                </div>
            </div>
        )
    })
}