import { useMutation } from "@tanstack/react-query";
import { authApi } from "../api/authApi";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { ErrorResponseDto } from "../../../types/errorResponseDto";

export const useRegister = () => {
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: authApi.register,
        onSuccess: () => {
            enqueueSnackbar("Registration successful! Please log in.", { variant: "success" });
            navigate("/login");
        },
        onError: (error: any) => {
            enqueueSnackbar(`Registration failed: ${error.errors.join(", ")}`, { variant: "error" });
        },
    });

    return {
        ...mutation,
        register: mutation.mutateAsync,
    };
};
