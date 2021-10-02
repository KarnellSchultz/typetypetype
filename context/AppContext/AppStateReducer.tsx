import { Action, State, Status } from "./types";
import { getWordSlice } from "./util";

export const AppStateReducer = (state: State, action: Action): State => {
  const { type, payload } = action;
  switch (type) {
    case Status.Start:
      return { ...state };
    case Status.Restart:
      return { ...state };
    case Status.NextSlice:
      console.log(state);
      
      return {
        ...state,
        CurrentWordSlice: state.NextTenWordSlice,
        NextTenWordSlice: getWordSlice(),
      };

    default:
      throw new Error("something went wrong mate");
  }
};
