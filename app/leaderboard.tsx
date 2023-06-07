import { TGame } from "@utils"

type Props = { games: TGame[] }
export const Leaderboard = ({ games }: Props) => {

    return (
        <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-700 capitalize bg-gray-50">
                <tr className='rounded-sm'>
                    <th className='px-4 py-2'>rank</th>
                    <th className='px-4 py-2'>user</th>
                    <th className='px-4 py-2 '>wpm</th>
                    <th className='px-4 py-2 '>taken</th>
                </tr>
            </thead>
            <tbody>
                {games.map((game, idx) => {
                    const rank = idx + 1
                    return (
                        <tr key={game.id}
                            className={`border-b border-gray-200 rounded-sm
                                 ${idx % 2 === 0 ? "bg-white" : "bg-gray-100"}`}>
                            <td className=' px-4 py-2'>{rank}</td>
                            <td className=' px-4 py-2'>{game.userName}</td>
                            <td className=' px-4 py-2'>{game.wpm}</td>
                            <td className=' px-4 py-2'>{game.takenAt}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}