import { useQuery } from "@tanstack/react-query";
import { projectKeys } from "./projectKeys";
import { projectApi } from "../api/projectApi";

export default function useGetMembers(projectId: string) {
    const query = useQuery({
        queryKey: projectKeys.members(projectId),
        queryFn: () => projectApi.getMembers(projectId),
    });

    return {
        ...query,
        members: query.data,
    };
}
