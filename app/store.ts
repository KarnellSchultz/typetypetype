import { create } from 'zustand'
import { TestWordType } from 'wordData'
import { getWordList } from 'lib/utils'

export const SLICE_STEP = 20

export const GameDurations = {
    FIFTEEN: 15,
    THIRTY: 30,
    SIXTY: 60,
} as const

export type TGameDuration = typeof GameDurations[keyof typeof GameDurations]

const GameStatus = {
    READY: "READY",
    PLAYING: 'PLAYING',
    GAMEOVER: 'GAMEOVER',
} as const

export type TGameStatus = typeof GameStatus[keyof typeof GameStatus]

export type TTypeStore = {
    inputValue: string
    setInputValue: (value: string) => void
    currentWordIndex: number
    incrementCurrentWordIndex: () => void
    resetCurrentWordIndex: () => void
    correctList: Map<TestWordType["id"], TestWordType>
    setCorrectList: (value: TestWordType) => void
    incorrectList: Map<TestWordType["id"], TestWordType>
    setIncorrectList: (value: TestWordType) => void
    sliceStep: number,
    incrementSlice: () => void
    selectedDuration: TGameDuration,
    setSelectedDuration: (value: TGameDuration) => void
    gameStatus: TGameStatus,
    setGameStatus: (value: TGameStatus) => void
    seconds: number
    setSeconds: (value: number) => void
    wordList: TestWordType[]
    setWordList: (value?: TestWordType[]) => void
}

export const useTypeStore = create<TTypeStore>((set) => ({
    inputValue: '',
    setInputValue: (value: string) => set({ inputValue: value }),

    currentWordIndex: 0,
    incrementCurrentWordIndex: () => set((state) => ({ currentWordIndex: state.currentWordIndex + 1 })),
    resetCurrentWordIndex: () => set({ currentWordIndex: 0 }),

    correctList: new Map(),
    setCorrectList: (value: TestWordType) => set((state) => ({ correctList: state.correctList.set(value.id, value) })),
    incorrectList: new Map(),
    setIncorrectList: (value: TestWordType) => set((state) => ({ incorrectList: state.incorrectList.set(value.id, value) })),

    sliceStep: SLICE_STEP,
    incrementSlice: () => set((state) => ({ sliceStep: state.sliceStep + SLICE_STEP })),
    selectedDuration: GameDurations.FIFTEEN,
    setSelectedDuration: (value) => set({ selectedDuration: value }),

    gameStatus: GameStatus.READY,
    setGameStatus: (value) => {
        if (value === GameStatus.READY) {
            set((state) => ({
                ...state,
                gameStatus: GameStatus.READY,
                correctList: new Map(),
                incorrectList: new Map(),
                currentWordIndex: 0,
                sliceStep: SLICE_STEP,
                inputValue: '',
                seconds: state.selectedDuration,
            }))
        }
        if (value === GameStatus.PLAYING) {
            set((state) => ({
                ...state,
                gameStatus: GameStatus.PLAYING,
            }))
        }
        if (value === GameStatus.GAMEOVER) {
            set((state) => ({
                ...state,
                gameStatus: GameStatus.GAMEOVER,
                seconds: state.selectedDuration,
            }))
        }
    },

    seconds: GameDurations.FIFTEEN,
    setSeconds: (value) => set({ seconds: value }),
    wordList: [],
    setWordList: (value) => set({ wordList: value ?? getWordList() }),
}))
