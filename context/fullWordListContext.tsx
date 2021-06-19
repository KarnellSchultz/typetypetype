import * as React from "react";
import { words } from "../wordsArray";

type FullWordListContextProviderProps = { children: React.ReactNode };
type WordsResultArray = string[];

const FullWordListContext = React.createContext<
  | {
      fullWordListState: WordsResultArray;
      setFullWordListState: (value: WordsResultArray) => void;
    }
  | undefined
>(undefined);

FullWordListContext.displayName = "Full Word List Context 🛰";

export const FullWordListContextProvider = ({
  children,
}: FullWordListContextProviderProps) => {
  const [fullWordListState, setFullWordListState] = React.useState(() => {
    // const getRandomWord = (wordArray: string[]) =>
    //   wordArray[Math.floor(Math.random() * wordArray.length)];

    const getWordsArray = (words: string[]) => {
      // let randomWords = getRandomWord(wordsArray);
      let wordResultArray: WordsResultArray = [];

      for (let step = 0; step < 10; step++) {
        wordResultArray.push(words[step]);
      }

      return wordResultArray;
    };

    return getWordsArray(words);
  });

  return (
    <FullWordListContext.Provider
      value={{ fullWordListState, setFullWordListState }}
    >
      {children}
    </FullWordListContext.Provider>
  );
};

export const useFullWordList = () => {
  const context = React.useContext(FullWordListContext);
  if (context === undefined) {
    throw new Error("Must be used within a FullWordListContextProvider");
  }
  return context;
};
