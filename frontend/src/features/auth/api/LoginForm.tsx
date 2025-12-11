import { Box, Typography, TextField, useTheme, Button, InputAdornment, Alert } from "@mui/material";
import { Key, Email } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginDto, loginSchema } from "../types/authSchemas";
import { GlassCard } from "../../../components/ui/GlassCard";
import { useLogin } from "../hooks/useLogin";

export const LoginForm = () => {
    const theme = useTheme();
    const iconColor = theme.palette.primary.light;
    const { login, isPending: loading, error } = useLogin();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginDto>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = (data: LoginDto) => {
        login(data);
    };

    return (
        <GlassCard
            sx={{
                padding: "3rem",
                width: "100%",
                maxWidth: 450,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "2rem",
            }}
        >
            <Typography
                variant="h3"
                component="h2"
                sx={{ marginBottom: "1rem", color: theme.palette.primary.light, textAlign: "center" }}
            >
                Welcome to Zenith
            </Typography>

            <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                sx={{ width: "100%", display: "flex", flexDirection: "column", gap: "1.5rem" }}
            >
                <TextField
                    type="email"
                    label="Email"
                    variant="outlined"
                    fullWidth
                    {...register("email")}
                    error={!!errors.email}
                    helperText={errors.email ? errors.email.message : ""}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Email sx={{ color: iconColor }} />
                                </InputAdornment>
                            ),
                            style: { color: theme.palette.text.primary },
                        },
                    }}
                />

                <TextField
                    type="password"
                    label="Password"
                    variant="outlined"
                    fullWidth
                    {...register("password")}
                    error={!!errors.password}
                    helperText={errors.password ? errors.password.message : ""}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Key sx={{ color: iconColor }} />
                                </InputAdornment>
                            ),
                            style: { color: theme.palette.text.primary },
                        },
                    }}
                />

                {error && <Alert severity="error">{error.errors.join("\n")}</Alert>}

                <Button
                    variant="contained"
                    type="submit"
                    size="large"
                    loading={loading}
                    sx={{ marginTop: "1.5rem", py: 1.5, fontWeight: 600 }}
                >
                    Login
                </Button>

                <Typography
                    variant="body2"
                    align="center"
                    sx={{ marginTop: "1rem", color: theme.palette.text.secondary }}
                >
                    Don't have an account?
                    <Link
                        to="/register"
                        style={{ color: theme.palette.primary.light, textDecoration: "none", marginLeft: "5px" }}
                    >
                        Sign up
                    </Link>
                </Typography>
            </Box>
        </GlassCard>
    );
};
