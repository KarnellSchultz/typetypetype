import React, { createContext, useEffect, useContext, useReducer } from "react";

import { AppStateReducer } from "./AppStateReducer";
import { State, Action, Status, WordDataType } from "./types";
import { getWordSlice } from "./util";

const Ctx = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
} | null>(null);

function getInitTestWord(): WordDataType["word"] {
  return initialState.CurrentWordSlice[0].word;
}

const initialState: State = {
  Status: Status.Start,
  CurrentWordSlice: getWordSlice(),
  NextTenWordSlice: getWordSlice(),
  CorrectWordBank: [],
  IncorrectWordBank: [],
  CurrentTestWord: "",
  CurrentWordIndex: 0,
};

export const ApplicationStateProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(AppStateReducer, initialState);
  useEffect(() => {
    dispatch({ type: "Ready" });
  }, []);

  const value = { state, dispatch };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
};

export const useApplicationState = () => {
  const ctx = useContext(Ctx);
  if (!ctx) {
    throw new Error("Needs to be used within a ApplicationStateProvider");
  }
  return ctx;
};
