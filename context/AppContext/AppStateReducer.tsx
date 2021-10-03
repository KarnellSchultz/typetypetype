import { Action, State, Status, WordDataType } from "./types";
import { initialState } from "./ApplicationStateContext";
import { getWordSlice } from "./util";

export const AppStateReducer = (state: State, action: Action): State => {
  const { type, payload } = action;
  switch (type) {
    case Status.Start: {
      return { ...state };
    }
    case Status.Restart: {
      const tempSlice = getWordSlice();
      const { word } = tempSlice[0];
      return {
        ...initialState,
        CurrentWordSlice: tempSlice,
        NextTenWordSlice: getWordSlice(),
        CurrentTestWord: word,
      };
    }
    case Status.Ready: {
      const newTargetWord = state.CurrentWordSlice[state.CurrentWordIndex].word;
      return { ...state, CurrentTestWord: newTargetWord };
    }
    case Status.NextSlice:
      return {
        ...state,
        CurrentWordSlice: state.NextTenWordSlice,
        NextTenWordSlice: getWordSlice(),
      };
    case Status.SubmitWord: {
      if (payload) {
        const updateSlice = payload?.CurrentWordIndex % 9 === 0 ? true : false;
      }

      let isCorrect: boolean = false;
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
            CurrentWordIndex: payload.CurrentWordIndex,
            CurrentTestWord:
              payload.CurrentWordSlice[payload.CurrentWordIndex]?.word ??
              payload?.NextTenWordSlice[0]?.word,
          };
        }
      }

      const incorrectWordObj = payload?.CurrentWordSlice.find(
        (el) => el.word === payload.CurrentTestWord
      );
      return {
        ...state,
        CurrentWordIndex: payload?.CurrentWordIndex || 0,
        CurrentTestWord:
          payload?.CurrentWordSlice[payload.CurrentWordIndex]?.word ??
          payload?.NextTenWordSlice[0]?.word,
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
  return userInput === targetWord ? true : false;
}
