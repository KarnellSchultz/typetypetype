'use client'

import { useUser } from '@clerk/nextjs'
import { useWordList } from 'components/hooks'
import React, { useState } from 'react'
import { TestWordType } from 'wordData'
import { useCountdown } from 'components/hooks'
import Link from 'next/link'
import { Leaderboard, UsersLeaderboard } from './leaderboard'
import { TestDuration } from './testDuration'

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
    const initSliceStep = 20
    const [sliceStep, setSliceStep] = useState(initSliceStep)
    const [selectedDuration, setSelectedDuration] = useState(30)

    const wordSlice = wordList.slice(sliceStep - initSliceStep, sliceStep)

    const currentWord = wordList[currentWordIndex]

    const user = useUser()

    const { seconds, isRunning, startAndStop, reset } = useCountdown(selectedDuration)

    // https://support.sunburst.com/hc/en-us/articles/229335208-Type-to-Learn-How-are-Words-Per-Minute-and-Accuracy-Calculated-#:~:text=Calculating%20Words%20per%20Minute%20(WPM)&text=Therefore%2C%20the%20number%20of%20words,elapsed%20time%20(in%20minutes).
    const getWordsPerMinute = () => {
        const totalWords = correctList.length + incorrectList.length
        const elapsedInMinutes = (selectedDuration - seconds) / 60 !== 0 ? (selectedDuration - seconds) / 60 : 1
        const wpm = totalWords / elapsedInMinutes
        return Math.round(wpm)
    }
    const wpm = getWordsPerMinute()

    // Handlers
    const handleResetClick = () => {
        reset(selectedDuration)
        setCurrectWordIndex(0)
    }
    const handleStartClick = () => {
        startAndStop()
        setCurrectWordIndex(0)
    }

    const durationClickHandler = (duration: number) => {
        reset(duration)
        setSelectedDuration(duration)
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
                <Link href={"/"}>
                    <button className='bg-gray-200 px-2  py-1 rounded-sm'>
                        Test
                    </button>
                </Link>
                <Link href={'/about'}>
                    <button className='bg-gray-200 px-2  py-1 rounded-sm'>
                        About
                    </button>
                </Link>

                {
                    !user.isSignedIn ? <Link href={"/sign-in"} >
                        <button className='bg-gray-200 px-2  py-1 rounded-sm'>
                            Sign in
                        </button>
                    </Link> : <Link href={"/profile"} >
                        <button className='bg-gray-200 px-2  py-1 rounded-sm'>
                            Profile
                        </button>
                    </Link>
                }
            </section>

            <section className=' p-4 bg-gray-50'>
                <div className='flex flex-wrap text-center'>
                    {wordSlice.map((testWord) => {
                        const isCurrentWord = testWord.word === currentWord.word
                        const isCorrect = correctList.find((word) => word.word === testWord.word)
                        const isIncorrect = incorrectList.find((word) => word.word === testWord.word)
                        return (
                            <span
                                key={testWord.id}
                                aria-label={`${testWord.word}-${testWord.id}`}
                                className={`px-1 rounded-sm ${isCorrect && "text-lime-600"} ${isIncorrect && "text-red-600"}
                                    ${isCurrentWord && "bg-gray-300 transition-[background] ease-in-out"}`} >
                                {testWord.word}
                            </span>
                        )
                    })}
                </div>
            </section>

            <form onSubmit={handleSubmit} className="px-8">
                <div className="py-4">
                    <input
                        disabled={!isRunning}
                        value={inputValue}
                        onChange={handleInputChange}
                        autoComplete='off'
                        type="text"
                        spellCheck='false'
                        className={`shadow appearance-none border rounded w-full py-2 px-3
                         leading-tight focus:outline-none focus:shadow-outline ${!isRunning && "cursor-not-allowed"}`} id="test-input" />
                </div>
                <div className="flex items-center justify-between">
                </div>
            </form>

            <button type="button" className='bg-gray-200 px-2  py-1 rounded-sm'
                onClick={() => {
                    const res = fetch('/api/games', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ userId: user.user?.id, score: 1, time: 10, })
                    })
                }}
            >Click</button>
            <section>
                <div className='flex justify-center gap-2'>
                    <div className='p-2 px-4 bg-gray-200 rounded-sm' >{seconds}</div>
                    <div className='p-2 px-4 bg-gray-200 rounded-sm' >{wpm}</div>
                    <button onClick={handleStartClick}
                        className="py-2 px-4 rounded-sm bg-gray-200 hover:bg-gray-400 " type="button">
                        {isRunning ? "Stop" : "Start"}
                    </button>
                </div>
            </section>

            <section>
                <h3 className='text-xl flex justify-center py-4' >Options</h3>
                <TestDuration selectedDuration={selectedDuration} durationClickHandler={durationClickHandler} />
            </section>
            <Leaderboard />
        </div>
    )
}
