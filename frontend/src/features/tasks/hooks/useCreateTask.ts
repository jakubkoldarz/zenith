import { useMutation, useQueryClient } from "@tanstack/react-query";
import { tasksApi } from "../api/tasksApi";
import { CreateTaskDto } from "../types/tasksSchemas";
import { projectKeys } from "../../projects/hooks/projectKeys";

export default function useCreateTask(projectId: string, categoryId: string) {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: tasksApi.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: projectKeys.tasks(projectId, categoryId) });
            queryClient.invalidateQueries({ queryKey: projectKeys.category(projectId, categoryId) });
        },
        onError: (error) => {
            console.error("Error creating task.", error.errors?.[0]);
        },
    });

    return {
        ...mutation,
        createTask: mutation.mutate,
        createTaskAsync: mutation.mutateAsync,
    };
}
