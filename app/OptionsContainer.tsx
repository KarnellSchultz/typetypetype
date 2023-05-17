import { motion } from "framer-motion"
import { GameDurations, HighlightStyle, TGameDuration, useTypeStore } from "./store"

type Props = {
    selectedDuration: TGameDuration
    durationClickHandler: (duration: TGameDuration) => void
}
export const OptionsContainer = (props: Props) => {
    const [selectedHighlightStyle, toggleSelectedHighlightStyle] = useTypeStore((state) => [state.selectedHighlightStyle, state.toggleSelectedHighlightStyle])
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
                                return (
                                    <span key={duration} className="relative">
                                        <button type='button' className={`rounded-xl px-2 hover:text-gray-700 `}
                                            onClick={() => durationClickHandler(duration)}>
                                            {
                                                isSelected &&
                                                <motion.div layoutId="option-duration" style={{ borderRadius: 9999 }}
                                                    transition={{ duration: 0.2, type: "spring", bounce: 0.2 }} className="absolute rounded-xl  bg-gray-300 inset-0" ></motion.div>
                                            }
                                            <span className="relative z-10" >{duration}</span>
                                        </button>
                                    </span>
                                )
                            })
                        }
                    </div>
                </li >
                <li className='flex w-full justify-between border-b py-1 ' >
                    <div className='capitalize'>highlight style</div>
                    <div className='flex gap-2'>
                        {
                            Object.values(HighlightStyle).map(tabStyle => {
                                return <span key={tabStyle} className="relative">
                                    <button className="px-2 outline-1 transition focus-visible:outline-2" onClick={toggleSelectedHighlightStyle} type="button" >
                                        {
                                            selectedHighlightStyle === tabStyle &&
                                            <motion.div layoutId="option-highlight"
                                                style={{ borderRadius: 9999 }}
                                                transition={{ duration: 0.6, type: "spring" }} className="absolute rounded-xl  bg-gray-300 inset-0" ></motion.div>
                                        }
                                        <span className="relative capitalize z-10">{tabStyle}</span>
                                    </button>
                                </span>
                            })
                        }

                    </div>
                </li>
                <li className='flex w-full justify-between border-b py-1 ' >
                    <div className='capitalize'>word list</div>
                    <div className='flex gap-2'>
                        <button type="button">easy</button>
                        <button type="button" >prose</button>
                    </div>
                </li>
                <li className='flex w-full justify-between border-b py-1 ' >
                    <div className='capitalize'>wpm</div>
                    <div className='flex gap-2'>
                        <button type="button">show</button>
                        <button type="button" >hide</button>
                    </div>
                </li>
                <li className='flex w-full justify-between border-b py-1 ' >
                    <div className='capitalize'>timer</div>
                    <div className='flex gap-2'>
                        <button type="button">show</button>
                        <button type="button" >hide</button>
                    </div>
                </li>
            </ul >
        </>)
}