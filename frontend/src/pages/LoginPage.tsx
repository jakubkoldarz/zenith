import { Stack } from "@mui/material";
import { LoginForm } from "../components/AuthForm/LoginForm";

export default function LoginPage() {
    return (
        <Stack
            alignItems="center"
            justifyContent="center"
            sx={{ minHeight: "100vh", backgroundSize: "cover", backgroundImage: "url('star_banner.png')" }}
        >
            <LoginForm />
        </Stack>
    );
}
