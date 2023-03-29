import { TestWordType } from 'wordData'
import { create } from 'zustand'

export const SLICE_STEP = 20

export const GameDurations = {
    FIFTEEN: 15,
    THIRTY: 30,
    SIXTY: 60,
} as const

export type TGameDuration = typeof GameDurations[keyof typeof GameDurations]

const GameStates = {
    INIT: "INIT",
    PLAYING: 'PLAYING',
    GAMEOVER: 'GAMEOVER',
} as const

export type TGameStatus = typeof GameStates[keyof typeof GameStates]

export type TGameState = {
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
    selectedDuration: number,
    setSelectedDuration: (value: TGameDuration) => void
    gameStatus: TGameStatus,
    setGameStatus: (value: TGameStatus) => void
}
export const useGameState = create<TGameState>((set) => ({
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
    gameStatus: GameStates.INIT,
    setGameStatus: (value) => set({ gameStatus: value }),
}))
