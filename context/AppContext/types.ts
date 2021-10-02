export const Status = {
  Start: "Start",
  Restart: "Restart",
  NextSlice: "NextSlice",
} as const;

export type State = {
  CurrentWordSlice: WordDataType[];
  NextTenWordSlice: WordDataType[];
  status: typeof Status[keyof typeof Status];
};

type ActionKind = typeof Status[keyof typeof Status];
export type Action = {
  type: ActionKind;
  payload?: State;
};

export type WordDataType = { length: number; word: string; id: number };
