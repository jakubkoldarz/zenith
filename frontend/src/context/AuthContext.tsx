import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { UserDto } from "../types/userDto";
import api from "../api";

interface AuthContextType {
    user: UserDto | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default AuthContext;

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<UserDto | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const login = (token: string) => {
        localStorage.setItem("authToken", token);
        setIsLoading(true);
        checkUserStatus();
    };

    const logout = () => {
        localStorage.removeItem("authToken");
        setUser(null);
    };

    const checkUserStatus = async () => {
        try {
            const { data } = await api.get<UserDto>("/auth/me");
            setUser(data);
        } catch (error) {
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        checkUserStatus();
    }, []);

    const value = {
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
    };

    return <AuthContext.Provider value={value}>{!isLoading && children}</AuthContext.Provider>;
};
