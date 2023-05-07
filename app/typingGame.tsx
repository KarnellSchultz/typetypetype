'use client'

import { useUser } from '@clerk/nextjs'
import { useFocusInput, useWPM, useWordList } from 'components/hooks'
import { useCountdown } from 'components/hooks'
import { SLICE_STEP, TGameDuration, useTypeStore } from './store'
import { useEffect, useRef } from 'react'
import { Api, TGame } from 'lib/utils'
import { OptionsContainer } from './OptionsContainer'

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
            // FIX WHAT HAPPENS WHEN THE GAME ENDS
            setGameStatus("GAMEOVER")
            postGame(wpm, selectedDuration)
            // setGameStatus("RESET")
        }
    }, [seconds, selectedDuration, wpm])

    const clearInput = () => setInputValue("")
    const focusInput = () => {
        inputRef.current?.focus()
    }

    // Handlers
    const handleResetClick = () => {
        // focusInput()
        setGameStatus("RESET")
        startAndStop()
    }

    const durationClickHandler = (duration: TGameDuration) => {
        focusInput()
        reset(duration)
        setSelectedDuration(duration)
    }


    const submitWord = (word: string, targetWord: string) => {
        const isCorrect = word === targetWord
        if (isCorrect) setCorrectList(currentWord)
        if (!isCorrect) setIncorrectList(currentWord)
        clearInput()
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (gameStatus === "INIT") {
            setGameStatus("PLAYING")
            startAndStop()
        }
        const inputValue = inputRef.current?.value ?? ""
        const formattedWord = inputValue.toLocaleLowerCase().trim()
        const isSpace = inputValue?.split("").pop() === " "

        if (!isSpace) return setInputValue(e.currentTarget.value)

        incrementCurrentWordIndex()
        const isLastofSlice = currentWordIndex + 1 === sliceStep
        if (isLastofSlice) incrementSlice()

        submitWord(formattedWord, currentWord.word)
    }

    useFocusInput(inputRef)

    return (
        <div>
            <section className=' p-4 bg-gray-50'>
                <div className='flex flex-wrap text-center'>
                    {wordSlice.map((testWord) => {
                        const isCurrentWord = testWord.word === currentWord.word
                        const isCorrect = correctList.has(testWord.id)
                        const isIncorrect = incorrectList.has(testWord.id)

                        // const testWordArray = Array.from(testWord.word)

                        // return (
                        //     <span key={`${testWord.id}`}>
                        //         {
                        //             testWordArray.map(letter => {
                        //                 return < span key={letter} >{letter}</span>
                        //             })
                        //         }
                        //     </span>
                        // )


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
                        <span className='rounded bg-green-300 p-2'>Start</span>
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
