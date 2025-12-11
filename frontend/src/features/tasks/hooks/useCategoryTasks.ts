import { useQuery } from "@tanstack/react-query";
import { tasksApi } from "../api/tasksApi";
import { projectKeys } from "../../projects/hooks/projectKeys";

export default function useCategoryTasks(projectId: string, categoryId: string) {
    const query = useQuery({
        queryKey: projectKeys.tasks(projectId, categoryId),
        queryFn: () => tasksApi.getAll(categoryId),
        enabled: !!projectId && !!categoryId,
    });

    return {
        ...query,
        tasks: query.data || [],
    };
}
