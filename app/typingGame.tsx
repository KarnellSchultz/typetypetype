'use client'

import { useUser } from '@clerk/nextjs'
import { useFocusInput, useWPM, useWordList } from 'components/hooks'
import { useCountdown } from 'components/hooks'
import { SLICE_STEP, TGameDuration, useTypeStore } from './store'
import { useEffect, useRef } from 'react'
import { Api, TGame } from 'lib/utils'
import { OptionsContainer } from './OptionsContainer'
import { TestWord } from './TestWord'

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
    const [inputValue, setInputValue] = useTypeStore(({ inputValue, setInputValue }) => [inputValue, setInputValue])
    const [currentWordIndex, incrementCurrentWordIndex] = useTypeStore(({ currentWordIndex, incrementCurrentWordIndex }) =>
        [currentWordIndex, incrementCurrentWordIndex])
    const [setCorrectList] = useTypeStore(({ setCorrectList }) =>
        ([setCorrectList]))
    const [setIncorrectList] = useTypeStore(({ setIncorrectList }) =>
        ([setIncorrectList]))
    const [sliceStep, incrementSlice] = useTypeStore(({ sliceStep, incrementSlice }) => [sliceStep, incrementSlice])
    const [selectedDuration, setSelectedDuration] = useTypeStore(({ selectedDuration, setSelectedDuration }) => {
        return [selectedDuration, setSelectedDuration]
    })
    const [gameStatus, setGameStatus] = useTypeStore(({ gameStatus, setGameStatus }) => [gameStatus, setGameStatus])
    const setWordList = useTypeStore(({ setWordList }) => setWordList)


    const wordList = useWordList()
    const wordSlice = wordList.slice(sliceStep - SLICE_STEP, sliceStep)

    const currentWord = wordList[currentWordIndex]
    const user = useUser()
    const { seconds, startAndStop, reset } = useCountdown()
    const wpm = useWPM()
    const inputRef = useRef<HTMLInputElement>(null)
    useFocusInput(inputRef)

    useEffect(() => {
        if (seconds <= 0 && wpm > 0) {
            setGameStatus("GAMEOVER")
            postGame(wpm, selectedDuration)
        }
    }, [seconds, selectedDuration, setGameStatus, wpm])



    // Handlers
    const handleResetClick = () => {
        setGameStatus("READY")
        setWordList()
        inputRef.current?.focus()
        reset(selectedDuration)
    }

    const durationClickHandler = (duration: TGameDuration) => {
        reset(duration)
        setSelectedDuration(duration)
    }

    const submitWord = (word: string, targetWord: string) => {
        const isCorrect = word === targetWord
        if (isCorrect) setCorrectList(currentWord)
        if (!isCorrect) setIncorrectList(currentWord)
        setInputValue("")
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (gameStatus === "READY") {
            setGameStatus("PLAYING")
            startAndStop()
        }
        const inputValue = inputRef.current?.value ?? ""
        const formattedWord = inputValue.toLocaleLowerCase().trim()
        const isSpace = inputValue?.at(-1) === " "

        if (!isSpace) return setInputValue(e.currentTarget.value)

        incrementCurrentWordIndex()
        const isLastofSlice = currentWordIndex + 1 === sliceStep
        if (isLastofSlice) incrementSlice()

        submitWord(formattedWord, currentWord.word)
    }


    return (
        <div>
            <section className=' p-4 bg-gray-50'>
                <div className='flex flex-wrap text-center'>
                    {wordSlice.map((testWord, idx) => {

                        return (
                            <TestWord key={`${testWord}-${idx}`} testWord={testWord} inputValue={inputValue} />
                        )
                    })}
                </div>
            </section >


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
                        <span className='rounded p-2'>reset</span>
                    </button>
                </div>
            </section>
            <section className='flex justify-center py-4'>
                <div className='p-2 px-4 rounded-sm uppercase' >{wpm} wpm</div>
            </section>

            <section className='py-4'>
                <OptionsContainer selectedDuration={selectedDuration} durationClickHandler={durationClickHandler} />
            </section>
        </div >
    )
}
