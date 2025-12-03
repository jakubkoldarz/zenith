import { Box, Typography, TextField, useTheme, Button, InputAdornment } from "@mui/material";
import { Key, Email } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { GlassCard } from "../ui/GlassCard";
import { LoginFormData, loginSchema } from "../../schemas/authSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSnackbar } from "notistack";
import api from "../../api";
import { LoginDto } from "../../types/authDto";

export const LoginForm = () => {
    const { enqueueSnackbar } = useSnackbar();
    const theme = useTheme();
    const iconColor = theme.palette.primary.light;

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = (data: LoginFormData) => {
        api.post<LoginDto>("/auth/login", { data }).then(() => {});
        enqueueSnackbar("Login functionality is not implemented yet.", { variant: "info" });
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

                <Button
                    variant="contained"
                    type="submit"
                    size="large"
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
