import { useMutation, useQueryClient } from "@tanstack/react-query";
import { tasksApi } from "../api/tasksApi";
import { projectKeys } from "../../projects/hooks/projectKeys";
import { enqueueSnackbar } from "notistack";
import { MoveTaskDto, TaskDto } from "../types/tasksSchemas";

interface MoveTaskVariables {
    taskId: string;
    data: MoveTaskDto;
    sourceCategoryId: string;
}

export default function useMoveTask(projectId: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ taskId, data }: MoveTaskVariables) => tasksApi.move(taskId, data),

        onMutate: async (variables) => {
            const { taskId, data, sourceCategoryId } = variables;
            const destCategoryId = data.categoryId;

            await queryClient.cancelQueries({ queryKey: projectKeys.tasks(projectId, sourceCategoryId) });
            await queryClient.cancelQueries({ queryKey: projectKeys.tasks(projectId, destCategoryId) });

            const previousSourceTasks = queryClient.getQueryData<TaskDto[]>(
                projectKeys.tasks(projectId, sourceCategoryId)
            );
            const previousDestTasks = queryClient.getQueryData<TaskDto[]>(projectKeys.tasks(projectId, destCategoryId));

            if (previousSourceTasks) {
                const taskToMove = previousSourceTasks.find((t) => t.id === taskId);

                if (taskToMove) {
                    if (sourceCategoryId === destCategoryId) {
                        const newTasks = [...previousSourceTasks];
                        const oldIndex = newTasks.findIndex((t) => t.id === taskId);
                        const [removed] = newTasks.splice(oldIndex, 1);
                        newTasks.splice(data.order, 0, removed);
                        const reorderedTasks = newTasks.map((t, index) => ({ ...t, order: index }));
                        queryClient.setQueryData(projectKeys.tasks(projectId, sourceCategoryId), reorderedTasks);
                    } else {
                        const newSourceTasks = previousSourceTasks
                            .filter((t) => t.id !== taskId)
                            .map((t, index) => ({ ...t, order: index }));
                        queryClient.setQueryData(projectKeys.tasks(projectId, sourceCategoryId), newSourceTasks);

                        const destTasks = previousDestTasks || [];
                        const newDestTasks = [...destTasks];
                        newDestTasks.splice(data.order, 0, {
                            ...taskToMove,
                            categoryId: destCategoryId,
                            order: data.order,
                        });
                        const reorderedDestTasks = newDestTasks.map((t, index) => ({ ...t, order: index }));
                        queryClient.setQueryData(projectKeys.tasks(projectId, destCategoryId), reorderedDestTasks);
                    }
                }
            }

            return { previousSourceTasks, previousDestTasks, sourceCategoryId, destCategoryId };
        },

        onError: (err, variables, context) => {
            if (context) {
                if (context.previousSourceTasks) {
                    queryClient.setQueryData(
                        projectKeys.tasks(projectId, context.sourceCategoryId),
                        context.previousSourceTasks
                    );
                }
                if (context.previousDestTasks) {
                    queryClient.setQueryData(
                        projectKeys.tasks(projectId, context.destCategoryId),
                        context.previousDestTasks
                    );
                }
            }
            enqueueSnackbar("Failed to move task", { variant: "error" });
        },

        onSuccess: () => {
            enqueueSnackbar("Task moved successfully", { variant: "success" });
        },
    });
}
