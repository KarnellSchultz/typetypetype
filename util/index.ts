import { WordDataType } from "context";
import { State } from "context/AppContext/types";

// https://www.speedtypingonline.com/typing-equations
export const calculateWpm = (wordBank: WordDataType[]): number => {
  const lengthOfCorrectWordsArr: number[] = wordBank?.map((el) => el.length);
  if (!lengthOfCorrectWordsArr.length) {
    return 0;
  }
  const sumOfWordlengths = lengthOfCorrectWordsArr.reduce((a, c) => a + c);
  const spaces = wordBank.length;
  const numerator = (sumOfWordlengths + spaces) / 5;
  // half a min is .5 one min is 1
  const denominator = 0.5;
  const result = Math.round(numerator / denominator);
  return result;
};

type TestWordColor = (testWord: string, appState: State) => string;
export const testWordColor: TestWordColor = (testWord, appState) => {
  const correct = JSON.stringify(appState.CorrectWordBank).includes(testWord);
  const incorrect = JSON.stringify(appState.IncorrectWordBank).includes(
    testWord
  );
  if (correct) {
    return `text-green-700`;
  }
  if (incorrect) {
    return `text-red-700`;
  }
  return "";
};
