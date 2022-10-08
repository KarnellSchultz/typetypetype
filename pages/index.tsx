import { Layout } from 'components/layout'
import { TestBar } from 'components/test-bar'
import React, { useState } from 'react'

import { WordListData } from '../wordData'

const getRandomWordIndex = () => Math.floor(Math.random() * WordListData.length)
const getRandomWord = () => WordListData[getRandomWordIndex()]

const MaxTestWords = 200

const createTestList = () => {
    let res = new Set()
    new Array(MaxTestWords).fill(null).forEach((_) => {
        res.add(getRandomWord())
    })

    return Array.from(res)
}

export async function getStaticProps() {
    return {
        props: {
            staticTestWords: createTestList(),
        },
    }
}

type TestWordType = {
    id: number
    length: number
    word: string
}

type HomeProps = { staticTestWords: TestWordType[] }

const Home = ({ staticTestWords }: HomeProps) => {
    const [testWords] = useState(staticTestWords)
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
