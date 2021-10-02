import { WordListData } from "wordData";
import { WordDataType } from "./types";

export const getRandomNumber = (): number =>
  Math.floor(Math.random() * WordListData.length - 10);

export const getWordSlice = (): WordDataType[] => {
  const sliceStart = getRandomNumber();
  const CreateNewSlice = () => WordListData.slice(sliceStart, sliceStart + 10);
  const result = CreateNewSlice();

  return result;
};
