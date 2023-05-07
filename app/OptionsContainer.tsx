import { GameDurations, TGameDuration } from "./store"

type Props = {
    selectedDuration: TGameDuration
    durationClickHandler: (duration: TGameDuration) => void
}
export const OptionsContainer = (props: Props) => {
    const { selectedDuration, durationClickHandler } = props
    return (
        <>
            <h3 className='text-xl flex justify-center py-4'>Options</h3>
            <ul className='w-full' >
                <li className='flex w-full justify-between border-b py-1' >
                    <div className='capitalize' >test duration</div>
                    <div className='flex gap-2'>
                        {
                            Object.values(GameDurations).map(duration => {
                                const isSelected = selectedDuration === duration
                                return <button type='button'
                                    key={duration}
                                    className={`${isSelected && "bg-slate-300"} rounded-xl px-2`}
                                    onClick={() => durationClickHandler(duration)}
                                >{duration}</button>
                            }
                            )
                        }
                    </div>
                </li>
                <li className='flex w-full justify-between border-b py-1 ' >
                    <div className='capitalize'>highlight style</div>
                    <div className='flex gap-2'>
                        <button type="button">word</button>
                        <button type="button" >character</button>
                    </div>
                </li>
            </ul>
        </>)
}