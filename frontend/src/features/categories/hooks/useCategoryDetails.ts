import { useQuery } from "@tanstack/react-query";
import { projectKeys } from "../../projects/hooks/projectKeys";
import { categoriesApi } from "../api/categoriesApi";

export default function useCategoryDetails(projectId: string, categoryId: string) {
    const query = useQuery({
        queryKey: projectKeys.category(projectId, categoryId),
        queryFn: () => categoriesApi.getOne(categoryId),
        enabled: !!projectId && !!categoryId,
    });

    return {
        ...query,
        category: query.data,
    };
}
