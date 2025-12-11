import { useMutation, useQueryClient } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { categoriesApi } from "../api/categoriesApi";
import { projectKeys } from "../../projects/hooks/projectKeys";
import { CategoryDto, CreateCategoryDto } from "../types/categoriesSchemas";

export const useCreateCategory = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: categoriesApi.create,
        onSuccess: (_data: CategoryDto, variables: CreateCategoryDto) => {
            const projectId = variables.projectId;

            queryClient.invalidateQueries({ queryKey: projectKeys.categories(projectId) });
            enqueueSnackbar("Category created successfully", { variant: "success" });
        },
        onError: () => {
            enqueueSnackbar("Failed to create category. Try again.", { variant: "error" });
        },
    });

    return {
        ...mutation,
        createCategory: mutation.mutate,
        createCategoryAsync: mutation.mutateAsync,
    };
};
