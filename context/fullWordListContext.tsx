import { createContext, useContext, useEffect, useState } from "react";
import { words } from "../wordsArray";

type FullWordListContextProviderProps = { children: React.ReactNode };
export type WordsResultArray = string[];

const FullWordListContext = createContext<{
  fullWordListState: WordsResultArray;
  setFullWordListState: (value: WordsResultArray) => void;
}>(null!);

FullWordListContext.displayName = "Full Word List Context 🛰";

const getRandomWord = (wordArray: string[]) =>
  wordArray[Math.floor(Math.random() * wordArray.length)];

const getWordsArray = (words: string[]) => {
  // let randomWords = getRandomWord(words);

  let wordResultArray: WordsResultArray = [];
  for (let step = 0; step < 50; step++) {
    let randomWord = getRandomWord(words);
    wordResultArray.push(randomWord);
  }
  return wordResultArray;
};

export const FullWordListContextProvider = ({
  children,
}: FullWordListContextProviderProps) => {
  const [fullWordListState, setFullWordListState] = useState<
    WordsResultArray | []
  >([]);
  useEffect(() => {
    if (fullWordListState.length === 0) {
      setFullWordListState(getWordsArray(words));
    }
  }, [fullWordListState]);

  return (
    <FullWordListContext.Provider
      value={{ fullWordListState, setFullWordListState }}
    >
      {children}
    </FullWordListContext.Provider>
  );
};

export const useFullWordList = () => {
  const context = useContext(FullWordListContext);
  if (typeof context === undefined) {
    throw new Error("Must be used within a FullWordListContextProvider");
  }
  return context;
};
