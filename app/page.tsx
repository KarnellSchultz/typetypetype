'use client'

import { TestBar } from 'components/test-bar'
import { useWordList } from 'components/hooks'
import React, { useState } from 'react'


// type HomeProps = { testWords: TestWordType }

const Home = () => {
    const testWords = useWordList()

    const [inputValue, setInputValue] = useState('')

    const firstTestWordSlice = testWords.slice(0, 10)
    const secondTestWordSlice = testWords.slice(10, 20)

    return (
        <div>
            <div className="flex">
                {firstTestWordSlice.map((wordObj) => {
                    return (
                        <div className="p-1" key={wordObj.id}>
                            {wordObj.word}
                        </div>
                    )
                })}
            </div>
            <div className="flex">
                {secondTestWordSlice.map((wordObj) => {
                    return (
                        <div className="p-1" key={wordObj.id}>
                            {wordObj.word}
                        </div>
                    )
                })}
            </div>

            <form
                onSubmit={(e) => {
                    e.preventDefault
                }}
            >
                <input
                    onChange={(e) => setInputValue(e.currentTarget.value)}
                    value={inputValue}
                    type="text"
                    name="test-input"
                    id="input"
                />
            </form>
            <TestBar
                // Add func for starting the app
                handleStartClick={(e: any) => {
                    console.warn('FUNC NOT CREATED YET')
                }}
                seconds={0}
                wordsPerMin={0}
                isRunning={false}
            />
        </div>
    )
}
export default Home

