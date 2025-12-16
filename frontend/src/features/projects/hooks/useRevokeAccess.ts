import { useMutation, useQueryClient } from "@tanstack/react-query";
import { projectApi } from "../api/projectApi";
import { enqueueSnackbar } from "notistack";
import { projectKeys } from "./projectKeys";

export default function useRevokeAccess(projectId: string) {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: projectApi.revoke,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: projectKeys.members(projectId) });
            enqueueSnackbar("Access revoked successfully", { variant: "success" });
        },
        onError: () => {
            enqueueSnackbar("Failed to revoke access", { variant: "error" });
        },
    });

    return {
        ...mutation,
        revokeAccess: mutation.mutate,
        revokeAccessAsync: mutation.mutateAsync,
    };
}
