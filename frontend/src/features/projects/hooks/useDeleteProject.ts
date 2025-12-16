import { useMutation, useQueryClient } from "@tanstack/react-query";
import { projectApi } from "../api/projectApi";
import { enqueueSnackbar } from "notistack";
import { projectKeys } from "./projectKeys";

export function useDeleteProject() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (projectId: string) => projectApi.delete(projectId),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: projectKeys.all });
            enqueueSnackbar("Project deleted successfully", { variant: "success" });
        },

        onError: () => {
            enqueueSnackbar("Failed to delete project", { variant: "error" });
        },
    });
}
