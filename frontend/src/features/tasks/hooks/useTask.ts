import { useQuery } from "@tanstack/react-query";
import { projectKeys } from "../../projects/hooks/projectKeys";

export default function useTask(projectId: string, categoryId: string, taskId: string) {
    const query = useQuery({
        queryKey: projectKeys.task(projectId, categoryId, taskId),
    });
}
