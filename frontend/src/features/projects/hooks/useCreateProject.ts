import { useMutation, useQueryClient } from "@tanstack/react-query";
import { projectKeys } from "./projectKeys";
import { enqueueSnackbar } from "notistack";
import { projectApi } from "../api/projectApi";
import { useNavigate } from "react-router-dom";

export const useCreateProject = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: projectApi.create,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: projectKeys.list() });
            enqueueSnackbar("Project created successfully!", { variant: "success" });
            navigate(`/projects/${data.id}`);
        },
        onError: () => {
            enqueueSnackbar("Failed to create project. Please try again.", { variant: "error" });
        },
    });

    return {
        ...mutation,
        createProject: mutation.mutate,
    };
};
