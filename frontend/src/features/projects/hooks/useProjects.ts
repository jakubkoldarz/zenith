import { useQuery } from "@tanstack/react-query";
import { projectKeys } from "./projectKeys";
import { projectApi } from "../api/projectApi";
import { useMemo } from "react";
import { ProjectRole } from "../../../types/projectRoles";

type useProjectsOptions = {
    enabled?: boolean;
};

export const useProjects = (options?: useProjectsOptions) => {
    const query = useQuery({
        queryKey: projectKeys.list(),
        queryFn: projectApi.getAll,
        staleTime: 1000 * 60 * 5,
        enabled: options?.enabled ?? true,
    });

    const { userProjects, sharedProjects } = useMemo(() => {
        if (!query.data) return { userProjects: [], sharedProjects: [] };

        return {
            userProjects: query.data.filter((project) => project.role === ProjectRole.Owner),
            sharedProjects: query.data.filter((project) => project.role !== ProjectRole.Owner),
        };
    }, [query.data]);

    return {
        ...query,
        userProjects,
        sharedProjects,
        allProjects: query.data ?? [],
    };
};
