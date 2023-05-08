import { TestWordType, WordListData } from "wordData"
import prisma from "./prisma"

export const Api = {
    Routes: {
        games: "/api/games",
        delete: "/api/delete-db",
        gamesId: (id: string) => `/api/games/${id}`
    },

} as const

export const PageRoutes = {
    home: '/',
    about: '/about',
    signIn: '/sign-in',
    signUp: '/sign-up',
    profile: '/profile',
    leaderboard: '/leaderboard',
} as const

export type TPageRoutes = typeof PageRoutes[keyof typeof PageRoutes]

export type TGame = {
    id: string
    takenAt: string
    wpm: number
    duration: number
    accuracy: number
    userId: string
    userName: string
}

const MAX_TEST_WORDS = 200

export const getWordList = () => {
    const getUniqueWord = (set: Set<any>): TestWordType => {
        const randomWord = getRandomWord()
        if (set.has(randomWord)) return getUniqueWord(set)
        return randomWord
    }

    const createTestList = () => {
        const list: Set<TestWordType> = new Set()
        for (let i = 1; i <= MAX_TEST_WORDS; i++) {
            list.add(getUniqueWord(list))
        }
        return Array.from(list)
    }

    const getRandomIndex = () => Math.floor(Math.random() * WordListData.length)
    const getRandomWord = () => WordListData[getRandomIndex()]

    return createTestList()
}
