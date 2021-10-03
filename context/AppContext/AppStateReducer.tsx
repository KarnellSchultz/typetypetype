import { Action, State, Status, WordDataType } from "./types";
import { getWordSlice } from "./util";

export const AppStateReducer = (state: State, action: Action): State => {
  const { type, payload } = action;
  switch (type) {
    case Status.Start: {
      return { ...state };
    }
    case Status.Restart: {
      return { ...state };
    }
    case Status.Ready: {
      const newTargetWord = state.CurrentWordSlice[0].word;
      return { ...state, CurrentTestWord: newTargetWord };
    }
    case Status.NextSlice:
      return {
        ...state,
        CurrentWordSlice: state.NextTenWordSlice,
        NextTenWordSlice: getWordSlice(),
      };
    case Status.SubmitWord: {
      let isCorrect: boolean = false;
      console.log(isCorrect);
      
      if (payload?.UserSubmittedWord && payload.CurrentTestWord) {
        isCorrect = checkSubmittedWord(
          payload?.UserSubmittedWord,
          payload?.CurrentTestWord
        );
        if (isCorrect) {
          const correctWordObj = payload.CurrentWordSlice.find(
            (el) => el.word === payload.CurrentTestWord
          );
          const tempCorrectBank: WordDataType[] = [
            ...payload.CorrectWordBank,
            correctWordObj as WordDataType,
          ];

          return {
            ...state,
            CorrectWordBank: tempCorrectBank as WordDataType[],
          };
        }
      }

      const incorrectWordObj = payload?.CurrentWordSlice.find(
        (el) => el.word === payload.CurrentTestWord
      );
      return {
        ...state,
        IncorrectWordBank: [
          ...(payload?.IncorrectWordBank as WordDataType[]),
          incorrectWordObj as WordDataType,
        ],
      };
    }


    default:
      throw new Error(
        `You passed in ${type} and ${JSON.stringify(
          payload
        )} and that's no good`
      );
  }
};

function checkSubmittedWord(userInput: string, targetWord: string): boolean {
  debugger
  return userInput === targetWord ? true : false;
}
