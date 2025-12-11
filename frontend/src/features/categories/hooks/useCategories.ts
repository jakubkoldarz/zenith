import { useQuery } from "@tanstack/react-query";
import { projectKeys } from "../../projects/hooks/projectKeys";
import { categoriesApi } from "../api/categoriesApi";

export default function useCategories(projectId: string) {
    const query = useQuery({
        queryKey: projectKeys.categories(projectId),
        queryFn: () => categoriesApi.getAll(projectId),
        enabled: !!projectId,
    });

    return {
        ...query,
        categories: query.data,
    };
}
