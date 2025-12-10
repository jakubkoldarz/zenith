import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import { projectApi } from "../api/projectApi";
import { enqueueSnackbar } from "notistack";
import { projectKeys } from "./projectKeys";

export const useUpdateProject = () => {
    const queryClient = useQueryClient();
    return useMutation({
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
};
