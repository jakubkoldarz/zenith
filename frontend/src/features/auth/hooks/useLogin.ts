import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import { authApi } from "../api/authApi";
import { enqueueSnackbar } from "notistack";

export const useLogin = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: authApi.login,
        onSuccess: (data) => {
            localStorage.setItem("authToken", data.token);
            queryClient.invalidateQueries({ queryKey: ["auth", "user"] });
            enqueueSnackbar("Login successful!", { variant: "success" });
        },
    });

    return {
        ...mutation,
        login: mutation.mutateAsync,
    };
};
