import { useMutation, useQueryClient } from "@tanstack/react-query";
import { projectApi } from "../api/projectApi";
import { enqueueSnackbar } from "notistack";
import { projectKeys } from "./projectKeys";

export default function useGrantAccess(projectId: string) {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: projectApi.assign,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: projectKeys.members(projectId) });
            enqueueSnackbar("Access granted to the project", { variant: "success" });
        },
        onError: () => {
            enqueueSnackbar("Failed to grant access to the project", { variant: "error" });
        },
    });

    return {
        ...mutation,
        grantAccess: mutation.mutate,
        grantAccessAsync: mutation.mutateAsync,
    };
}
