export const usersKeys = {
    all: ["users"] as const,
    search: (query: string) => [...usersKeys.all, "search", query] as const,
    detail: (userId: string) => [...usersKeys.all, "detail", userId] as const,
};
