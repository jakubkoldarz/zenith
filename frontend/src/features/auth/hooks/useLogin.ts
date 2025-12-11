import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authApi } from "../api/authApi";
import { enqueueSnackbar } from "notistack";
import { ErrorResponseDto } from "../../../types/errorResponseDto";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: authApi.login,
        onSuccess: (data) => {
            localStorage.setItem("authToken", data.token);
            queryClient.invalidateQueries({ queryKey: ["auth", "user"] });
            enqueueSnackbar("Login successful!", { variant: "success" });
            navigate("/");
        },
        onError: (error: ErrorResponseDto) => {
            const message = error?.errors?.[0] ?? "Login failed. Please try again.";
            enqueueSnackbar(message, { variant: "error" });
        },
    });

    return {
        ...mutation,
        login: mutation.mutate,
    };
};
