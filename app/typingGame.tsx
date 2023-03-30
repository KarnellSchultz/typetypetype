'use client'

import { useUser } from '@clerk/nextjs'
import { useWPM, useWordList } from 'components/hooks'
import { useCountdown } from 'components/hooks'
import Link from 'next/link'
import { Leaderboard } from './leaderboard'
import { TestDuration } from './testDuration'
import { SLICE_STEP, TGameDuration, useTypeStore } from './store'
import { useEffect } from 'react'
import { Api } from './api/services'


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

    const [inputValue, setInputValue] = useTypeStore(({ inputValue, setInputValue }) => [inputValue, setInputValue])
    const [currentWordIndex, incrementCurrentWordIndex, resetCurrentWordIndex] = useTypeStore(({ currentWordIndex, incrementCurrentWordIndex, resetCurrentWordIndex }) =>
        [currentWordIndex, incrementCurrentWordIndex, resetCurrentWordIndex])
    const [correctList, setCorrectList] = useTypeStore(({ correctList, setCorrectList }) =>
        ([correctList, setCorrectList]))
    const [incorrectList, setIncorrectList] = useTypeStore(({ incorrectList, setIncorrectList }) =>
        ([incorrectList, setIncorrectList]))
    const [sliceStep, incrementSlice] = useTypeStore(({ sliceStep, incrementSlice }) => [sliceStep, incrementSlice])
    const [selectedDuration, setSelectedDuration] = useTypeStore(({ selectedDuration, setSelectedDuration }) => {
        return [selectedDuration, setSelectedDuration]
    })
    const [gameStatus, setGameStatus] = useTypeStore(({ gameStatus, setGameStatus }) => [gameStatus, setGameStatus])

    const wordSlice = wordList.slice(sliceStep - SLICE_STEP, sliceStep)

    const currentWord = wordList[currentWordIndex]

    const user = useUser()

    const { seconds, isRunning, startAndStop, reset } = useCountdown(selectedDuration)

    const wpm = useWPM()

    // Handlers
    const handleStartClick = () => {
        startAndStop()
        resetCurrentWordIndex()
        setGameStatus("PLAYING")
    }

    useEffect(() => {
        if (seconds <= 0) {
            setGameStatus("GAMEOVER")
            console.log("game over");
            const res = fetch(Api.Routes.games, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId: user.user?.id, score: wpm, time: selectedDuration, })
            })
        }
    }, [seconds, selectedDuration, wpm, user.user?.id])

    const durationClickHandler = (duration: TGameDuration) => {
        reset(duration)
        setSelectedDuration(duration)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        incrementCurrentWordIndex()
        const isLastofSlice = currentWordIndex + 1 === sliceStep

        if (isLastofSlice) incrementSlice()

        if (inputValue.toLocaleLowerCase().trim() !== currentWord.word) {
            setIncorrectList(currentWord)
            setInputValue("")
            return
        }

        setCorrectList(currentWord)
        setInputValue("")
    }

    const handleInputChange = (e: React.FocusEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value)
    }

    return (
        <div>
           

            <section className=' p-4 bg-gray-50'>
                <div className='flex flex-wrap text-center'>
                    {wordSlice.map((testWord) => {
                        const isCurrentWord = testWord.word === currentWord.word
                        const isCorrect = correctList.has(testWord.id)
                        const isIncorrect = incorrectList.has(testWord.id)
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
