import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
    const queryClient = useQueryClient();
    const naviate = useNavigate();

    return {
        logout: () => {
            localStorage.removeItem("authToken");
            queryClient.clear();
            naviate("/login");
        },
    };
};
