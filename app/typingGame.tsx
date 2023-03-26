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

    const firstWordSlice = wordList.slice(sliceStep - initSliceStep, sliceStep)
    const secondWordSlice = wordList.slice(sliceStep, sliceStep + initSliceStep)

    const currentWord = wordList[currentWordIndex]


    const user = useUser()

    const { timeLeft, reset } = useCountdown(30)

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

    return (
        <div>

            <div>{timeLeft}</div>
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
            <div className="flex">
                {secondWordSlice.map((testWord) => {
                    return (
                        <span className="p-1" key={testWord.id}>
                            {testWord.word}
                        </span>
                    )
                })}
            </div>

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


            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="test-input">
                        test-input
                    </label>
                    <input
                        value={inputValue}
                        onChange={(e) => setInputValue(e.currentTarget.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="test-input" type="text" placeholder="Username" />
                </div>

                <div className="flex items-center justify-between">
                    <button onClick={() => {
                        reset(30)
                    }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                        Start
                    </button>
                </div>
            </form>


            <UsersTopGames />

            {/* {
                games.map((game) => {
                    return (
                        <div key={game.id}>
                            <div>id:{game.id}</div>
                            <div>score:{game.score}</div>
                            <div>time:{game.time}</div>
                            <div>userId:{game.userId}</div>
                        </div>)
                })
            } */}
        </div>
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
                data.games.map((game) => {
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