import { useQuery } from "@tanstack/react-query";
import { usersKeys } from "../types/usersKeys";
import { userApi } from "../api/userApi";

export default function useSearchUsers(queryString: string) {
    const query = useQuery({
        queryKey: usersKeys.search(queryString),
        queryFn: () => userApi.search(queryString),
        enabled: queryString.length >= 3,
        staleTime: 1000 * 60 * 1,
        placeholderData: (prevData) => prevData,
    });
    return {
        ...query,
        users: query.data || [],
    };
}
