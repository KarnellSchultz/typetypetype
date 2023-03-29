
export const Api = {
    Routes: {
        games: "/api/games",
        delete: "/api/delete-db",
        gamesId: (id: string) => `/api/games/${id}`
    },

} as const
