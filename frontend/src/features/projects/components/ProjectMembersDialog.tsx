import {
    Dialog,
    DialogTitle,
    DialogContent,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
    IconButton,
    Typography,
    Box,
    CircularProgress,
    Chip,
    useTheme,
    alpha,
} from "@mui/material";
import { PersonRemove } from "@mui/icons-material";
import useGetMembers from "../hooks/useGetMembers";
import useRevokeAccess from "../hooks/useRevokeAccess";
import { ProjectRole } from "../../../types/projectRoles";
import { useRoleColor } from "../../../hooks/useRoleColor";
import { RoleChip } from "../../../components/RoleChip";

export function ProjectMembersDialog({
    open,
    onClose,
    projectId,
    canEdit,
}: {
    open: boolean;
    onClose: () => void;
    projectId: string;
    canEdit: boolean;
}) {
    const theme = useTheme();
    const { members, isLoading } = useGetMembers(projectId);
    const { revokeAccess } = useRevokeAccess(projectId);

    const handleRemoveMember = (userId: string) => {
        revokeAccess({ projectId, userId });
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
            slotProps={{
                paper: {
                    sx: {
                        paddingTop: 1,
                        backgroundColor: "background.paper",
                        backgroundImage: "none",
                        border: `1px solid ${alpha(theme.palette.common.white, 0.1)}`,
                        borderRadius: "12px",
                        boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
                    },
                },
            }}
        >
            <DialogTitle sx={{ fontWeight: "bold", fontSize: "1.4rem" }}>Project Members</DialogTitle>

            <DialogContent>
                {isLoading ? (
                    <Box display="flex" justifyContent="center" p={3}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <List>
                        {members?.map((member) => (
                            <ListItem
                                key={member.id}
                                secondaryAction={
                                    canEdit && member.role !== ProjectRole.Owner ? (
                                        <IconButton
                                            edge="end"
                                            aria-label="remove"
                                            onClick={() => handleRemoveMember(member.id)}
                                            sx={{
                                                color: "error.main",
                                                "&:hover": {
                                                    backgroundColor: alpha(theme.palette.error.main, 0.1),
                                                },
                                            }}
                                        >
                                            <PersonRemove />
                                        </IconButton>
                                    ) : null
                                }
                                sx={{
                                    borderRadius: 1,
                                    mb: 1,
                                    "&:hover": {
                                        backgroundColor: alpha(theme.palette.common.white, 0.05),
                                    },
                                }}
                            >
                                <ListItemAvatar>
                                    <Avatar sx={{ bgcolor: "primary.main" }}>
                                        {member.firstname[0]}
                                        {member.lastname?.[0] || ""}
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={
                                        <Box display="flex" alignItems="center" gap={1}>
                                            <Typography variant="body1">
                                                {member.firstname} {member.lastname}
                                            </Typography>
                                            <RoleChip role={member.role as ProjectRole} />
                                        </Box>
                                    }
                                    secondary={member.email}
                                />
                            </ListItem>
                        ))}
                    </List>
                )}
                {!isLoading && (!members || members.length === 0) && (
                    <Typography variant="body2" color="text.secondary" textAlign="center" p={3}>
                        No members yet
                    </Typography>
                )}
            </DialogContent>
        </Dialog>
    );
}
