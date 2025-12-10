import { useQuery } from "@tanstack/react-query";
import { authApi } from "../api/authApi";

export const useAuthUser = () => {
    const token = localStorage.getItem("authToken");

    const query = useQuery({
        queryKey: ["auth", "user"],
        queryFn: authApi.getProfile,
        retry: false,
        staleTime: 1000 * 60 * 60,
        enabled: !!token,
    });

    const isLoading = !!token && query.isLoading;

    return {
        ...query,
        user: query.data,
        isLoading: isLoading,
    };
};
