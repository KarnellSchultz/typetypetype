'use client'
import { useUser } from '@clerk/nextjs'
import { useWordList } from 'components/hooks'
import React, { useState } from 'react'
import { TestWordType } from 'wordData'

import useSWR from 'swr'

import { useCountdown } from 'components/hooks'

type Props = {
    games: {
        id: string,
        score: number,
        time: number,
        userId: string
    }[]
}
export const TypingGame = ({ games }: Props) => {
    const wordList = useWordList()

    const [inputValue, setInputValue] = useState('')
    const [currentWordIndex, setCurrectWordIndex] = useState(0)
    const [correctList, setCorrectList] = useState<TestWordType[]>([])
    const [incorrectList, setIncorrectList] = useState<TestWordType[]>([])
    const initSliceStep = 10
    const [sliceStep, setSliceStep] = useState(initSliceStep)

    const [selectedDuration, setSelectedDuration] = useState(30)
    const durationClickHandler = (duration: number) => {
        setSelectedDuration(duration)
    }
    const firstWordSlice = wordList.slice(sliceStep - initSliceStep, sliceStep)
    const secondWordSlice = wordList.slice(sliceStep, sliceStep + initSliceStep)

    const currentWord = wordList[currentWordIndex]

    const user = useUser()
    const { timeLeft, reset } = useCountdown(selectedDuration)

    const handleResetClick = () => {
        reset(selectedDuration)
        setCurrectWordIndex(0)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setCurrectWordIndex(p => p += 1)
        const isLastofSlice = currentWordIndex + 1 === sliceStep

        if (isLastofSlice) setSliceStep(p => p += initSliceStep)

        if (inputValue.toLocaleLowerCase().trim() !== currentWord.word) {
            setIncorrectList(p => [...p, currentWord])
            setInputValue("")
            return
        }

        setCorrectList(p => [...p, currentWord])
        setInputValue("")
    }

    const handleInputChange = (e: React.FocusEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value)
    }

    return (
        <div className='' >
            <section>
                <h1 className='text-2xl flex justify-center py-8'>type
                    <span className='text-purple-600'>
                        type
                    </span>
                    type</h1>
            </section>
            <section className='py-8 flex justify-evenly'>
                <button className='bg-gray-200 px-2  py-1 rounded-sm'>
                    Test
                </button>
                <button className='bg-gray-200 px-2  py-1 rounded-sm'>
                    About
                </button>
                <button className='bg-gray-200 px-2  py-1 rounded-sm'>
                    Profile
                </button>
            </section>

            <section className='bg-red-50 '>
                <div>
                    <div className="flex">
                        {firstWordSlice.map((testWord) => {
                            const isCurrentWord = testWord.word === currentWord.word
                            return (
                                <span
                                    key={testWord.id}
                                    aria-label={`${testWord.word}-${testWord.id}`}
                                    className={`p-1 ${isCurrentWord && "bg-slate-300"}`} >
                                    {testWord.word}
                                </span>
                            )
                        })}
                    </div>
                    <div className="flex flex-wrap">
                        {secondWordSlice.map((testWord) => {
                            return (
                                <span className="p-1" key={testWord.id}>
                                    {testWord.word}
                                </span>
                            )
                        })}
                    </div>
                </div>

            </section>


            <div>
                <div>correct:{correctList.length}</div>
                <div>incorrect:{incorrectList.length}</div>
            </div>

            <button type="button"
                onClick={() => {
                    const res = fetch('/api/game', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ userId: user.user?.id, score: 10, time: 60, })
                    })
                }}
            >Click</button>

            <div>{timeLeft}</div>


            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <input
                        value={inputValue}
                        onChange={handleInputChange}
                        autoComplete='off'
                        type="text"
                        spellCheck='false'
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="test-input" type="text" />
                </div>

                <div className="flex items-center justify-between">
                    <button onClick={handleResetClick
                    } className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                        Reset
                    </button>
                </div>
            </form>

            <h3 className='text-xl flex justify-center py-4' >Options</h3>
            <TestDuration selectedDuration={selectedDuration} durationClickHandler={durationClickHandler} />
            <UsersTopGames />
        </div>
    )
}

type TestDurationProps = { selectedDuration: number, durationClickHandler: (duration: number) => void }
const TestDuration = ({ selectedDuration, durationClickHandler }: TestDurationProps) => {
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


const getGames = (url: string) => fetch(url).then(res => res.json())

const UsersTopGames = () => {
    const { user } = useUser()
    const { data, error, isLoading } = useSWR(`/api/game/${user?.id}`, getGames)

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