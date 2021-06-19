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
  switch (action.type) {
    case "update": {
      return { ...state, word: action.payload };
    }
    case "check": {
      return { ...state, word: "" };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

export const WordProvider = ({ children }: WordProviderProps) => {
  const [state, dispatch] = React.useReducer(wordReducer, { word: "" });

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
