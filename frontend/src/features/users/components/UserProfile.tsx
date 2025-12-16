import { Box, Grid, Paper, Typography, Avatar, Stack, useTheme, alpha, Container } from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import GroupIcon from "@mui/icons-material/Group";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import useUserProfile from "../hooks/useUserProfile";
import { useProjects } from "../../projects/hooks/useProjects";

export default function UserProfile() {
    const theme = useTheme();
    const { user, isLoading } = useUserProfile();
    const { allProjects, sharedProjects, userProjects } = useProjects();

    if (isLoading || !user) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
                <Typography variant="h6" color="primary">
                    Loading your profile...
                </Typography>
            </Box>
        );
    }

    const initials = `${user.firstname[0]}${user?.lastname?.[0] || ""}`.toUpperCase();

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 4 }}>
                    <Paper
                        sx={{
                            p: 4,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            textAlign: "center",
                            borderRadius: "16px",
                            background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${alpha(
                                theme.palette.primary.main,
                                0.05
                            )} 100%)`,
                            border: "1px solid rgba(255,255,255,0.05)",
                        }}
                    >
                        <Avatar
                            sx={{
                                width: 120,
                                height: 120,
                                mb: 2,
                                fontSize: "2.5rem",
                                fontWeight: "bold",
                                bgcolor: "primary.main",
                                boxShadow: `0 0 20px ${alpha(theme.palette.primary.main, 0.4)}`,
                            }}
                        >
                            {initials}
                        </Avatar>

                        <Typography variant="h5" fontWeight="bold">
                            {user.firstname} {user.lastname}
                        </Typography>

                        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                            {user.email}
                        </Typography>

                        <Box
                            sx={{
                                px: 2,
                                py: 0.5,
                                borderRadius: "20px",
                                bgcolor: alpha(theme.palette.success.main, 0.1),
                                color: theme.palette.success.main,
                                border: `1px solid ${alpha(theme.palette.success.main, 0.2)}`,
                                mb: 4,
                            }}
                        >
                            <Typography variant="caption" fontWeight="bold">
                                Active account
                            </Typography>
                        </Box>
                    </Paper>
                </Grid>

                <Grid size={{ xs: 12, md: 8 }}>
                    <Grid container spacing={2} sx={{ mb: 3 }}>
                        <StatCard
                            label="Total Projects"
                            value={allProjects.length}
                            icon={<AssignmentIcon color="primary" />}
                        />
                        <StatCard
                            label="Your Projects"
                            value={userProjects.length}
                            icon={<CheckCircleIcon color="secondary" />}
                        />
                        <StatCard
                            label="Shared with You"
                            value={sharedProjects.length}
                            icon={<GroupIcon sx={{ color: theme.palette.success.main }} />}
                        />
                    </Grid>

                    <Paper
                        sx={{
                            p: 4,
                            borderRadius: "16px",
                            border: "1px solid rgba(255,255,255,0.05)",
                            background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${alpha(
                                theme.palette.background.default,
                                0.5
                            )} 100%)`,
                        }}
                    >
                        <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
                            Personal Information
                        </Typography>

                        <Stack spacing={3}>
                            <InfoRow
                                icon={<PersonIcon color="primary" />}
                                label="Full Name"
                                value={`${user.firstname} ${user.lastname || ""}`}
                            />
                            <InfoRow icon={<EmailIcon color="primary" />} label="Email Address" value={user.email} />
                        </Stack>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}

function StatCard({ label, value, icon }: { label: string; value: string | number; icon: React.ReactNode }) {
    const theme = useTheme();
    return (
        <Grid size={{ xs: 12, sm: 4 }}>
            <Paper
                sx={{
                    p: 2.5,
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    borderRadius: "12px",
                    bgcolor: alpha(theme.palette.background.default, 0.5),
                    border: "1px solid rgba(255,255,255,0.05)",
                    transition: "transform 0.2s, box-shadow 0.2s",
                    "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.2)}`,
                    },
                }}
            >
                <Box
                    sx={{
                        p: 1.5,
                        borderRadius: "10px",
                        bgcolor: alpha(theme.palette.background.paper, 1),
                        display: "flex",
                        boxShadow: `0 4px 12px ${alpha(theme.palette.common.black, 0.1)}`,
                    }}
                >
                    {icon}
                </Box>
                <Box>
                    <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ textTransform: "uppercase", fontWeight: "bold", letterSpacing: 0.5 }}
                    >
                        {label}
                    </Typography>
                    <Typography variant="h5" fontWeight="bold">
                        {value}
                    </Typography>
                </Box>
            </Paper>
        </Grid>
    );
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
    const theme = useTheme();
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                p: 2,
                borderRadius: "10px",
                bgcolor: alpha(theme.palette.background.default, 0.3),
                border: `1px solid ${alpha(theme.palette.common.white, 0.05)}`,
            }}
        >
            <Box
                sx={{
                    p: 1,
                    borderRadius: "8px",
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                {icon}
            </Box>
            <Box sx={{ flex: 1 }}>
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: "bold" }}>
                    {label}
                </Typography>
                <Typography variant="body1" fontWeight="500">
                    {value}
                </Typography>
            </Box>
        </Box>
    );
}
