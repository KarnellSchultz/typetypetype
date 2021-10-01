import React, { createContext, useState, useContext, useMemo } from "react";
import { WordListData } from "../wordData";

export type WordDataType = { length: number; word: string; id: number };

const Ctx = createContext<{
  state: WordDataType[];
}>(null!);

export const WordDataContextProvider: React.FunctionComponent = ({
  children,
}) => {
  const [state] = useState<WordDataType[]>(WordListData);
  return <Ctx.Provider value={{ state }}>{children}</Ctx.Provider>;
};

export const useWordDataContext = () => {
  const context = useContext(Ctx);
  if (!context) {
    throw new Error(
      "This context needs to be used within a WordDataContextProvider Provider"
    );
  }
  return context;
};

//all words
//current ten words
//next ten words
//correct words
//incorrect words
