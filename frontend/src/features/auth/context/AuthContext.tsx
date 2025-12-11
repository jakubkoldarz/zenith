import { createContext, ReactNode } from "react";
import { UserDto } from "../../users/types/userSchemas";
import { useLogout } from "../hooks/useLogout";
import { useLogin } from "../hooks/useLogin";
import { useAuthUser } from "../hooks/useAuthUser";
import { LoginDto } from "../types/authSchemas";
import { CircularProgress, Stack } from "@mui/material";

interface AuthContextType {
    user: UserDto | null;
    isAuthenticated: boolean;
    login: (data: LoginDto) => void;
    logout: () => void;
    isLoading?: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const { user, isLoading: isUserLoading } = useAuthUser();
    const { login, isPending } = useLogin();
    const { logout } = useLogout();

    if (isPending || isUserLoading) {
        return (
            <Stack alignItems="center" justifyContent="center" height="100vh">
                <CircularProgress />
            </Stack>
        );
    }

    const value = {
        user: user || null,
        isAuthenticated: !!user,
        login,
        logout,
        isLoading: isPending || isUserLoading,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
