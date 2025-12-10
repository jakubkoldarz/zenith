import { useQuery } from "@tanstack/react-query";
import { projectKeys } from "./projectKeys";
import { projectApi } from "../api/projectApi";

export function useProjectDetails(projectId: string) {
    const query = useQuery({
        queryKey: projectKeys.detail(projectId),
        queryFn: () => projectApi.getOne(projectId),
    });

    return {
        ...query,
        project: query.data,
    };
}
