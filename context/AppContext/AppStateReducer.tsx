import { Action, State, Status } from "./types";
import { getWordSlice } from "./util";

export const AppStateReducer = (state: State, action: Action): State => {
  const { type, payload } = action;
  switch (type) {
    case Status.Start: {
      return { ...state };
    }
    case Status.Restart:
      return { ...state };
    case Status.Ready:
      return { ...state };
    case Status.NextSlice:
      return {
        ...state,
        CurrentWordSlice: state.NextTenWordSlice,
        NextTenWordSlice: getWordSlice(),
      };
    case Status.SubmitWord: {
      if (payload?.CurrentWordIndex) {
        const tempWordObj = state.CurrentWordSlice[payload?.CurrentWordIndex];
        const isCorrect =
          tempWordObj.word ===
          state.CurrentWordSlice[payload?.CurrentWordIndex].word;

        if (isCorrect) {
          return {
            ...state,
            CorrectWordBank: [...state.CorrectWordBank, tempWordObj],
          };
        }
        return {
          ...state,
          IncorrectWordBank: [...state.CorrectWordBank, tempWordObj],
        };
      }
    }
    default:
      throw new Error(
        `You passed in ${type} and ${JSON.stringify(
          payload
        )} and that's no good`
      );
  }
};
