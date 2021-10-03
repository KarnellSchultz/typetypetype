export const Status = {
  Start: "Start",
  Ready: "Ready",
  Restart: "Restart",
  NextSlice: "NextSlice",
  SubmitWord: "SubmitWord",
} as const;

export type State = {
  CurrentWordSlice: WordDataType[];
  NextTenWordSlice: WordDataType[];
  Status: typeof Status[keyof typeof Status];
  CurrentTestWord?: string;
  UserSubmittedWord?: string;
  CorrectWordBank: WordDataType[];
  IncorrectWordBank?: WordDataType[];
  CurrentWordIndex:number
};

type ActionKind = typeof Status[keyof typeof Status];
export type Action = {
  type: ActionKind;
  payload?: State;
};

export type WordDataType = { length: number; word: string; id: number };