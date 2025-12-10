import { CircularProgress, Stack } from "@mui/material";
import useAuth from "../../features/auth/hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
    const { isAuthenticated, isLoading } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}
