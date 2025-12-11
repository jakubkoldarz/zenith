export const projectKeys = {
    all: ["projects"] as const,
    list: () => [...projectKeys.all, "list"] as const,
    details: () => [...projectKeys.all, "detail"] as const,
    detail: (id: string) => [...projectKeys.details(), id] as const,
    categories: (projectId: string) => [...projectKeys.detail(projectId), "categories"] as const,
    category: (projectId: string, categoryId: string) => [...projectKeys.categories(projectId), categoryId] as const,
    tasks: (projectId: string, categoryId: string) =>
        [...projectKeys.category(projectId, categoryId), "tasks"] as const,
    task: (projectId: string, categoryId: string, taskId: string) =>
        [...projectKeys.tasks(projectId, categoryId), taskId] as const,
};
