import { Action, State, Status } from "./types";
import { getWordSlice } from "./util";

export const AppStateReducer = (state: State, action: Action): State => {
  const { type, payload } = action;
  switch (type) {
    case Status.Start: {
      return { ...state, CurrentTestWord: "hello" };
    }
    case Status.Restart:
      return { ...state };
    case Status.NextSlice:
      return {
        ...state,
        CurrentWordSlice: state.NextTenWordSlice,
        NextTenWordSlice: getWordSlice(),
      };
    case Status.SubmitWord: {
      const tempItem = state.CurrentWordSlice[0];
      return {
        ...state,
        CorrectWordBank: [...state.CorrectWordBank, tempItem],
      };
    }
    /////////////////////////////////
    default:
      throw new Error(
        `You passed in ${type} and ${JSON.stringify(
          payload
        )} and that's no good`
      );
  }
};
