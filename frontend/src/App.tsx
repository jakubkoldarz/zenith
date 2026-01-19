import "./App.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import { theme } from "./theme";
import { SnackbarProvider } from "notistack";
import RegisterPage from "./pages/RegisterPage";
import PublicRoute from "./components/auth/PublicRoute";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import MainLayout from "./components/layouts/MainLayout";
import UserProfile from "./features/users/components/UserProfile";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProjectsPanel from "./features/projects/components/ProjectsPanel";
import ProjectDetails from "./features/projects/components/ProjectDetails";
import axios from "axios";
import { AuthProvider } from "./features/auth/context/AuthContext";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: (failureCount: number, error: any) => {
                if (axios.isAxiosError(error)) {
                    const status = error.response?.status;
                    if (status && status >= 400 && status < 500) {
                        return false;
                    }
                }

                return failureCount < 3;
            },
            refetchOnWindowFocus: false,
        },
    },
});

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <SnackbarProvider
                    maxSnack={5}
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    autoHideDuration={700}
                >
                    <BrowserRouter>
                        <AuthProvider>
                            <Routes>
                                <Route element={<PublicRoute />}>
                                    <Route path="/login" element={<LoginPage />} />
                                    <Route path="/register" element={<RegisterPage />} />
                                </Route>

                                <Route element={<ProtectedRoute />}>
                                    <Route element={<MainLayout />}>
                                        <Route path="/profile" element={<UserProfile />} />
                                        <Route path="/projects" element={<ProjectsPanel />} />
                                        <Route path="projects/:id" element={<ProjectDetails />} />
                                    </Route>
                                </Route>

                                <Route path="*" element={<Navigate to="/projects" replace />} />
                            </Routes>
                        </AuthProvider>
                    </BrowserRouter>
                </SnackbarProvider>
            </ThemeProvider>
        </QueryClientProvider>
    );
}

export default App;
