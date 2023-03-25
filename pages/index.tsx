import { Layout } from 'components/layout'
import { TestBar } from 'components/test-bar'
import React, { useState } from 'react'

import { WordListData } from '../wordData'

type TestWordType = {
    id: number
    length: number
    word: string
}

const getRandomWordIndex = () => Math.floor(Math.random() * WordListData.length)
const getRandomWord = () => WordListData[getRandomWordIndex()]

const MAX_TEST_WORDS = 200

const getUniqueWord = (set: Set<any>): TestWordType => {
    const randomWord = getRandomWord()
    if (set.has(randomWord)) return getUniqueWord(set)
    return randomWord
}

const createTestList = () => {
    const list = new Set()
    for (let i = 1; i <= MAX_TEST_WORDS; i++) {
        list.add(getUniqueWord(list))
    }
    return Array.from(list)
}



export async function getStaticProps() {
    const testWords = createTestList()
    return {
        props: {
            testWords,
        },
    }
}

type HomeProps = { testWords: TestWordType[] }

const Home = ({ testWords }: HomeProps) => {
    const [inputValue, setInputValue] = useState('')

    const firstTestWordSlice = testWords.slice(0, 10)
    const secondTestWordSlice = testWords.slice(10, 20)

    return (
        <Layout pageTitle="About">
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
        </Layout>
    )
}
export default Home
