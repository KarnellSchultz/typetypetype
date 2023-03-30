
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