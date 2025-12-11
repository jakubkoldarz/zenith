import { useMutation, useQueryClient } from "@tanstack/react-query";
import { categoriesApi } from "../api/categoriesApi";
import { projectKeys } from "../../projects/hooks/projectKeys";
import { UpdateCategoryDto } from "../types/categoriesSchemas";
import { enqueueSnackbar } from "notistack";

export default function useUpdateCategory() {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: ({ id, projectId, data }: { id: string; projectId: string; data: UpdateCategoryDto }) => {
            return categoriesApi.update(id, data);
        },
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({ queryKey: projectKeys.category(variables.projectId, variables.id) });
            queryClient.invalidateQueries({ queryKey: projectKeys.categories(variables.projectId) });
            queryClient.invalidateQueries({ queryKey: projectKeys.detail(variables.projectId) });
            enqueueSnackbar("Category updated successfully", { variant: "success" });
        },
        onError: () => {
            enqueueSnackbar("Failed to update category", { variant: "error" });
        },
    });

    return {
        ...mutation,
        updateCategory: mutation.mutate,
        updateCategoryAsync: mutation.mutateAsync,
    };
}
