import {
    AppBar,
    Avatar,
    Box,
    Button,
    IconButton,
    Menu,
    MenuItem,
    Stack,
    Toolbar,
    Tooltip,
    Typography,
} from "@mui/material";
import { theme } from "../theme";
import { useRef, useState } from "react";
import useAuth from "../features/auth/hooks/useAuth";
import { Add } from "@mui/icons-material";
import ProjectSearch from "../features/projects/components/ProjectSearch";
import { useNavigate } from "react-router-dom";

export default function AppHeader({ onOpenCreateDialog }: { onOpenCreateDialog: () => void }) {
    const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);
    const userAvatarButton = useRef<HTMLButtonElement | null>(null);
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleOpenModal = () => {
        onOpenCreateDialog();
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: theme.palette.background.default }}>
            <Toolbar>
                <Stack direction="row" alignItems="center" spacing={1} sx={{ flexGrow: 0 }}>
                    <Box component="img" src="/logo_new.png" alt="Logo" sx={{ height: 30 }} />
                    <Typography variant="h5" sx={{ letterSpacing: "1px", fontWeight: "200" }}>
                        Zenith
                    </Typography>
                </Stack>
                <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <ProjectSearch />
                    <Button
                        variant="contained"
                        size="small"
                        sx={{ ml: 1, height: 38, minWidth: "unset", padding: 0, aspectRatio: "1 / 1" }}
                        color="primary"
                        onClick={handleOpenModal}
                    >
                        <Add />
                    </Button>
                </Box>
                <Box>
                    <Tooltip title="User Settings">
                        <IconButton ref={userAvatarButton} onClick={() => setMenuAnchor(userAvatarButton.current)}>
                            <Avatar sx={{ width: 40, height: 40 }} />
                        </IconButton>
                    </Tooltip>
                    <Menu
                        open={Boolean(menuAnchor)}
                        onClose={() => setMenuAnchor(null)}
                        anchorEl={menuAnchor}
                        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                        transformOrigin={{ vertical: "top", horizontal: "right" }}
                    >
                        <MenuItem onClick={() => navigate("/profile")}>Profile</MenuItem>
                        <MenuItem onClick={() => navigate("/projects")}>Projects</MenuItem>
                        <MenuItem onClick={logout}>Logout</MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
