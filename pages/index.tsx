import { Layout } from 'components/Layout'
import React, { useState } from 'react'

import { WordListData } from '../wordData'

const getRandomWordIndex = () => Math.floor(Math.random() * WordListData.length)
const getRandomWord = () => WordListData[getRandomWordIndex()]

const MaxTestWords = 200

const createTestList = () => {
    let res = new Set()
    new Array(MaxTestWords).fill({}).forEach((element) => {
        res.add(getRandomWord())
    })

    return Array.from(res)
}

const Home = () => {
    const [testWords, setTestWords] = useState(() => createTestList())
    const [inputValue, setInputValue] = useState('')

    return (
        <Layout pageTitle="About">
            <div className="flex">
                {testWords.slice(0, 10).map((wordObj) => {
                    return (
                        <div className="p-1" key={wordObj.id}>
                            {wordObj.word}
                        </div>
                    )
                })}
            </div>
            <div className="flex">
                {testWords.slice(15, 20).map((wordObj) => {
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
                    console.log(inputValue)
                }}
            >
                <input
                    onChange={(e) => setInputValue(e.currentTarget.value)}
                    value={inputValue}
                    type="text"
                    name="test-input"
                    id="input"
                />
                <button onClick={() => {}}>Click</button>
            </form>
        </Layout>
    )
}
export default Home
