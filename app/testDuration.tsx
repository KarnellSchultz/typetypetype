import { GameDurations, TGameDuration } from "./store"

type Props = { selectedDuration: TGameDuration, durationClickHandler: (duration: TGameDuration) => void }

export const TestDuration = ({ selectedDuration, durationClickHandler }: Props) => {
    const gameDurationsArray = Object.values(GameDurations)
    return (
        <div className="flex justify-center gap-2">
            {
                gameDurationsArray.map((duration) => {
                    const selected = duration === selectedDuration
                    return (
                        <button key={duration} onClick={() => durationClickHandler(duration)} className={`rounded-full bg-gray-200 p-2
                          ${selected && "bg-slate-500 text-white"} `}
                            type='button' > {duration}</button>
                    )
                })
            }
        </div >
    )
}
