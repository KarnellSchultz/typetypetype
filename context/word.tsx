import React, { useContext } from "react";

type Action =
  | { type: "update"; payload: string }
  | { type: "check"; payload?: string };
type Dispatch = (action: Action) => void;
type WordProviderProps = { children: React.ReactNode };
type WordContextProps = { word: string };
type State = { word: string };

const WordContext = React.createContext<
  | {
      state: WordContextProps;
      dispatch: Dispatch;
    }
  | undefined
>(undefined);

const wordReducer = (state: State, action: Action) => {
  const { type } = action;
  switch (type) {
    case "update": {
      return { ...state, word: action.payload };
    }
    case "check": {
      return { ...state, word: "" };
    }
    default: {
      throw new Error(`Unhandled action type: ${type}`);
    }
  }
};

export const WordProvider = ({ children }: WordProviderProps) => {
  const initState = { word: "" };
  const [state, dispatch] = React.useReducer(wordReducer, () => initState);

  const value = { state, dispatch };

  return <WordContext.Provider value={value}>{children}</WordContext.Provider>;
};

export const useWord = () => {
  const context = useContext(WordContext);
  if (context === undefined) {
    throw new Error("useWord must be used within a WordProvider");
  }
  return context;
};
