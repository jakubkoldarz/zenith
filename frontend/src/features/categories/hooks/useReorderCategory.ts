import { useMutation, useQueryClient } from "@tanstack/react-query";
import { categoriesApi } from "../api/categoriesApi";
import { projectKeys } from "../../projects/hooks/projectKeys";
import { enqueueSnackbar } from "notistack";
import { CategoryDto } from "../types/categoriesSchemas";

interface ReorderCategoryVariables {
    categoryId: string;
    newOrder: number;
}

export default function useReorderCategory(projectId: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ categoryId, newOrder }: ReorderCategoryVariables) =>
            categoriesApi.reorder(categoryId, { order: newOrder }),

        onMutate: async ({ categoryId, newOrder }) => {
            await queryClient.cancelQueries({ queryKey: projectKeys.categories(projectId) });

            const previousCategories = queryClient.getQueryData<CategoryDto[]>(projectKeys.categories(projectId));

            if (previousCategories) {
                const categoryIndex = previousCategories.findIndex((c) => c.id === categoryId);
                if (categoryIndex !== -1) {
                    const newCategories = [...previousCategories];
                    const [movedCategory] = newCategories.splice(categoryIndex, 1);
                    newCategories.splice(newOrder, 0, movedCategory);

                    const reordered = newCategories.map((cat, index) => ({ ...cat, order: index }));
                    queryClient.setQueryData(projectKeys.categories(projectId), reordered);
                }
            }

            return { previousCategories };
        },

        onError: (err, variables, context) => {
            if (context?.previousCategories) {
                queryClient.setQueryData(projectKeys.categories(projectId), context.previousCategories);
            }
            enqueueSnackbar("Failed to reorder category", { variant: "error" });
        },

        onSuccess: () => {
            enqueueSnackbar("Category reordered successfully", { variant: "success" });
        },
    });
}
