'use client'
import { useUser } from '@clerk/nextjs'
import { useWordList } from 'components/hooks'
import React, { useState } from 'react'
import { TestWordType } from 'wordData'


export const TypingGame = () => {
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
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                        Start
                    </button>
                </div>
            </form>

        </div>
    )

}