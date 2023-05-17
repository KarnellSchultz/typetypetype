import { TestWordType } from "wordData"
import { HighlightStyle, useTypeStore } from "./store"
import { useWordList } from "components/hooks"
import { motion } from "framer-motion"

type Props = {
    testWord: TestWordType
    inputValue: string
}
export const TestWordContainer = ({ inputValue, testWord }: Props) => {
    const [currentWordIndex, correctList, incorrectList, selectedHighlightStyle] = useTypeStore((state) =>
        [state.currentWordIndex, state.correctList, state.incorrectList, state.selectedHighlightStyle])

    const wordList = useWordList()
    const currentWord = wordList[currentWordIndex]
    const isCurrentWord = testWord.id === currentWord.id
    const isCorrect = correctList.has(testWord.id)
    const isIncorrect = incorrectList.has(testWord.id)


    if (selectedHighlightStyle === HighlightStyle.CHAR) {
        return <TestLetters isActive={isCurrentWord}
            inputValue={inputValue} testWord={testWord} key={testWord.id} />
    }

    return <TestWord inputValue={inputValue} isActive={currentWord.id === testWord.id} isCorrect={isCorrect} isIncorrect={isIncorrect} testWord={testWord} key={testWord.id} />
}



type WordProps = {
    testWord: TestWordType
    inputValue: string
    isActive: boolean
    isCorrect: boolean
    isIncorrect: boolean
}
export const TestWord = ({ testWord, inputValue, isActive, isCorrect, isIncorrect }: WordProps) => {
    return (
        <span
            key={testWord.id}
            aria-label={`${testWord.word}-${testWord.id} `}
            className={`relative px-1`} >
            {isActive && <motion.div transition={{ duration: 0.1 }} layoutId='active-word' className={`bg-slate-200 absolute inset-0 `} />}
            <span className={`relative z-10 rounded-sm ${isCorrect && "text-lime-600"} ${isIncorrect && "text-red-600"}`} >
                {testWord.word}
            </span>
        </span>)
}


type TestLettersProps = {
    testWord: TestWordType
    inputValue: string
    isActive: boolean
}
const TestLetters = ({ isActive, inputValue, testWord }: TestLettersProps) => {
    const [currentWordIndex, correctList, incorrectList, selectedHighlightStyle] = useTypeStore((state) =>
        [state.currentWordIndex, state.correctList, state.incorrectList, state.selectedHighlightStyle])
    return (
        // working on correct work/letter
        <span className="px-1 relative">{
            [...testWord.word].map((letter, idx) => {
                const isCurrentLetter = isActive && inputValue.length === idx
                const isCorrect = correctList.has(testWord.id)
                const isIncorrect = inputValue[idx] !== testWord.word[idx] && isActive && idx < inputValue.length
                return (
                    <span aria-label={`${testWord.id}-${letter}`} key={`${testWord.id}-${letter}-${idx}`}
                        className={`relative ${isCorrect && "bg-green-300"} ${isIncorrect && 'bg-red-600'}`}>
                        {isCurrentLetter && <motion.div transition={{ duration: 0.15 }} layoutId='active-letter' className={`bg-slate-300 absolute inset-0 `} />}
                        <span className="relative z-10">{letter}</span>
                    </span>
                )
            })
        }</span>
    )
}

