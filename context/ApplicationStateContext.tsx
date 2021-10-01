import React, { createContext, useContext, useReducer } from "react";
import { WordDataType } from "../context/WordDataContext";
import { WordListData } from "../wordData";

const Ctx = createContext(null!);

type TestWords = {
  CurrentWordSlice: WordDataType[];
  NextTenWordSlice: WordDataType[];
};

const Status = {
  Start: "Start",
  Restart: "Restart",
  NextSlice: "NextSlice",
} as const;

type ActionKind = typeof Status[keyof typeof Status];
type Action = {
  type: ActionKind;
  payload: State;
};

type State = {
  CurrentWordSlice: WordDataType[];
  NextTenWordSlice: WordDataType[];
  status: typeof Status[keyof typeof Status];
};

const initialState: State = {
  status: Status.Start,
  CurrentWordSlice: WordListData.slice(0, 10),
  NextTenWordSlice: WordListData.slice(0, 10),
};

export const AppStateReducer = (state: State, action: Action): State => {
  const { type, payload } = action;
  switch (type) {
    case Status.Start:
      return { ...state };
    case Status.Restart:
      return { ...state };
    case Status.NextSlice:
      return {
        ...state,
        CurrentWordSlice: state.NextTenWordSlice,
        NextTenWordSlice: GETNEXTTEN,
      };

    default:
      throw new Error("something went wrong mate");
  }
};

export const ApplicationStateProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(AppStateReducer, initialState);
  const value = { state, dispatch };
  return <Ctx.Provider value={value as never}>{children}</Ctx.Provider>;
};

export const useApplicationState = () => {
  const ctx = useContext(Ctx);
  if (!ctx) {
    throw new Error("Needs to be used within a ApplicationStateProvider");
  }
  return ctx;
};
