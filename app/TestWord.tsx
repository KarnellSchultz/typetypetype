import { TestWordType } from "wordData"
import { useTypeStore } from "./store"
import { useWordList } from "components/hooks"

type Props = {
    testWord: TestWordType
    inputValue: string
}
export const TestWord = ({ inputValue, testWord }: Props) => {
    const [currentWordIndex, correctList, incorrectList] = useTypeStore(({ currentWordIndex, correctList, incorrectList }) =>
        [currentWordIndex, correctList, incorrectList])

    const wordList = useWordList()
    const currentWord = wordList[currentWordIndex]
    const isCurrentWord = testWord.id === currentWord.id
    const isCorrect = correctList.has(testWord.id)
    const isIncorrect = incorrectList.has(testWord.id)

    return (
        <span
            key={testWord.id}
            aria-label={`${testWord.word}-${testWord.id} `}
            className={`px-1 rounded-sm ${isCorrect && "text-lime-600"} ${isIncorrect && "text-red-600"}
            ${isCurrentWord && "bg-gray-300 transition-[background] ease-in-out"}`} >
            {
                <TestLetters testWord={testWord} inputValue={inputValue} isActive={isCurrentWord} />
            }
        </span>
    )
}

type TestLettersProps = {
    testWord: TestWordType
    inputValue: string
    isActive: boolean
}
const TestLetters = ({ isActive, inputValue, testWord }: TestLettersProps) => {
    return (
        <>{
            [...testWord.word].map((letter, idx) => {
                const isCurrentLetter = isActive && inputValue.length === idx

                const isCorrect = inputValue[idx] === testWord.word[idx] && isActive
                return (
                    <span aria-label={`${testWord.id}-${letter}`} key={`${testWord.id}-${letter}-${idx}`}
                        className={`${isCurrentLetter && 'bg-slate-400'} ${isCorrect && "bg-green-300"}`}
                    >
                        {letter}</span >
                )
            })
        }</>
    )
}

