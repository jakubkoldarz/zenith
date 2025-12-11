import { useMutation, useQueryClient } from "@tanstack/react-query";
import { projectApi } from "../api/projectApi";
import { enqueueSnackbar } from "notistack";
import { projectKeys } from "./projectKeys";

export const useUpdateProject = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: projectApi.update,
        onSuccess: (_data, variables) => {
            const projectId = variables.id;

            queryClient.invalidateQueries({ queryKey: projectKeys.list() });
            queryClient.invalidateQueries({ queryKey: projectKeys.detail(projectId) });

            enqueueSnackbar("Project updated successfully", { variant: "success" });
        },
        onError: () => {
            enqueueSnackbar("Failed to update project", { variant: "error" });
        },
    });

    return {
        ...mutation,
        updateProject: mutation.mutate,
    };
};
