

type TestDurationProps = { selectedDuration: number, durationClickHandler: (duration: number) => void }
export const TestDuration = ({ selectedDuration, durationClickHandler }: TestDurationProps) => {
    const durationsArr = [10, 30, 60]
    return (
        <div className="flex justify-center gap-2">
            {
                durationsArr.map((duration) => {
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
