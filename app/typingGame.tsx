'use client'

import { useUser } from '@clerk/nextjs'
import { useWPM, useWordList } from 'components/hooks'
import { useCountdown } from 'components/hooks'
import { TestDuration } from './testDuration'
import { SLICE_STEP, TGameDuration, useTypeStore } from './store'
import { useEffect, useRef } from 'react'
import { Api, TGame } from 'lib/utils'
import { mutate } from "swr"
import { VscDebugRestart } from 'react-icons/Vsc'



const postGame = async (wpm: TGame["wpm"], duration: TGame["duration"]) => {
    fetch(Api.Routes.games, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            wpm,
            duration,
        })
    })
}

export const TypingGame = () => {
    const wordList = useWordList()

    const [inputValue, setInputValue] = useTypeStore(({ inputValue, setInputValue }) => [inputValue, setInputValue])
    const [currentWordIndex, incrementCurrentWordIndex] = useTypeStore(({ currentWordIndex, incrementCurrentWordIndex }) =>
        [currentWordIndex, incrementCurrentWordIndex])
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

    const inputRef = useRef<HTMLInputElement>(null)


    useEffect(() => {
        if (seconds <= 0) {
            setGameStatus("GAMEOVER")
            postGame(wpm, selectedDuration)
            // setGameStatus("INIT")
        }
    }, [seconds, selectedDuration, wpm])

    // Handlers
    const handleResetClick = () => {
        startAndStop()
        setGameStatus("RESET")
    }

    const focus = () => {
        inputRef.current?.focus()
    }

    const durationClickHandler = (duration: TGameDuration) => {
        reset(duration)
        setSelectedDuration(duration)
    }

    // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault()
    //     incrementCurrentWordIndex()
    //     const isLastofSlice = currentWordIndex + 1 === sliceStep

    //     if (isLastofSlice) incrementSlice()

    //     if (inputValue.toLocaleLowerCase().trim() !== currentWord.word) {
    //         setIncorrectList(currentWord)
    //         setInputValue("")
    //         return
    //     }
    //     setCorrectList(currentWord)
    //     setInputValue("")
    // }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (gameStatus === "INIT") {
            setGameStatus("PLAYING")
            startAndStop()
        }
        const inputValue = inputRef.current?.value

        const isSpace = inputValue?.split("").pop() === " "

        if (isSpace) {
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

            <section className="py-4">
                <input
                    ref={inputRef}
                    disabled={gameStatus === "GAMEOVER"}
                    value={inputValue}
                    onChange={handleInputChange}
                    autoComplete='off'
                    type="text"
                    spellCheck='false'
                    className={`shadow appearance-none border rounded w-full 
                        py-2 px-3 leading-tight focus:outline-none focus:shadow-outline
                        ${gameStatus === "GAMEOVER" && "cursor-not-allowed"}`} id="test-input" />
            </section>

            <div className="flex items-center justify-between">
            </div>

            <section>
                <div className='flex justify-center gap-2'>
                    <div className='p-2 px-4 bg-gray-200 rounded-sm' >{seconds}</div>
                    <div className='p-2 px-4 bg-gray-200 rounded-sm' >{wpm}</div>
                    <button onClick={handleResetClick}
                        className="py-2 px-4 rounded-sm bg-gray-200 hover:bg-gray-400" type="button">
                        <VscDebugRestart />
                    </button>
                </div>
            </section>
            <section className='flex justify-center py-4'>
                <div className='p-2 px-4 rounded-sm uppercase' >{wpm} wpm</div>
            </section>

            <section className='py-4'>
                <h3 className='text-xl flex justify-center py-4' >Options</h3>
                <TestDuration selectedDuration={selectedDuration} durationClickHandler={durationClickHandler} />
            </section>
        </div>
    )
}
