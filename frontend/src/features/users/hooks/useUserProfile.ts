import { useQuery } from "@tanstack/react-query";
import { usersKeys } from "../types/usersKeys";
import { authApi } from "../../auth/api/authApi";

export default function useUserProfile() {
    const query = useQuery({
        queryFn: authApi.getProfile,
        queryKey: usersKeys.detail("profile"),
    });

    return {
        ...query,
        user: query.data,
    };
}
