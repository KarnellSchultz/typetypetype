/* eslint-disable import/no-anonymous-default-export */
import type { NextApiRequest, NextApiResponse } from "next";
import { words } from "../../words";

type Data = {
  wordList: WordsResultArray;
};

type WordsResultArray = string[];

const getRandomWord = (wordArray: string[]) =>
  wordArray[Math.floor(Math.random() * wordArray.length)];

const getWordsArray = (words: string) => {
  let wordsArray = words.split("\n");
  //   let randomWords = getRandomWord(wordsArray);

  let wordResultArray: WordsResultArray = [];

  for (let step = 0; step < 10; step++) {
    wordResultArray.push(getRandomWord(wordsArray));
  }

  return wordResultArray;
};

export default (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const wordResponse = getWordsArray(words);
//   console.log(wordResponse);
  res.status(200).json({ wordList: wordResponse });
};
