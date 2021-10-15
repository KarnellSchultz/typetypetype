import create from "zustand";

export interface UseStore {
  inputState: string;
  wordsPerMin: number;
  setInputState: (input: string) => void;
  setWordsPerMin: (num: number) => void;
}

export const useStore = create<UseStore>((set) => ({
  inputState: "",
  wordsPerMin: 0,
  setInputState: (input) => set(() => ({ inputState: input })),
  setWordsPerMin: (number) => set(() => ({ wordsPerMin: number })),
}));

export interface UseWordCountStore {
  currentWordCount: number;
  incramentWordCount: () => void;
  resetWordCount: () => void;
}

export const useWordCountStore = create<UseWordCountStore>((set) => ({
  currentWordCount: 0,
  resetWordCount: () => set(() => ({ currentWordCount: 0 })),
  incramentWordCount: () =>
    set((state) => ({ currentWordCount: state.currentWordCount + 1 })),
}));
