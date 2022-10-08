// https://www.speedtypingonline.com/typing-equations
export const calculateWpm = (wordBank: any[]): number => {
    const lengthOfCorrectWordsArr: number[] = wordBank?.map((el) => el.length)
    if (!lengthOfCorrectWordsArr.length) {
        return 0
    }
    const sumOfWordlengths = lengthOfCorrectWordsArr.reduce((a, c) => a + c)
    const spaces = wordBank.length
    const numerator = (sumOfWordlengths + spaces) / 5
    // half a min is .5 one min is 1
    const denominator = 0.5
    const result = Math.round(numerator / denominator)
    return result
}
