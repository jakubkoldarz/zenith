import { Card, CardActionArea, CardContent, Typography, Box, Grid, IconButton, Menu, MenuItem } from "@mui/material";
import { Delete, MoreVert } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useRoleColor } from "../../../hooks/useRoleColor";
import { ProjectDto } from "../types/projectSchemas";
import { useState } from "react";
import { useDeleteProject } from "../hooks/useDeleteProject";
import { ProjectRole } from "../../../types/projectRoles";

export function ProjectCard({ project }: { project: ProjectDto }) {
    const navigate = useNavigate();
    const roleColor = useRoleColor(project.role);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const { mutate: deleteProject } = useDeleteProject();
    const isOwner = project.role === ProjectRole.Owner;

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleDelete = (event: React.MouseEvent) => {
        event.stopPropagation();
        deleteProject(project.id);
        handleMenuClose();
    };

    return (
        <Grid key={project.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <Card sx={{ borderRadius: 2, position: "relative" }}>
                {isOwner && (
                    <IconButton
                        onClick={handleMenuOpen}
                        sx={{
                            position: "absolute",
                            top: 8,
                            right: 8,
                            zIndex: 1,
                            opacity: 0.7,
                            "&:hover": { opacity: 1 },
                        }}
                        size="small"
                    >
                        <MoreVert fontSize="small" />
                    </IconButton>
                )}
                <CardActionArea onClick={() => navigate(`/projects/${project.id}`)}>
                    <CardContent>
                        <Typography
                            sx={{
                                WebkitLineClamp: 1,
                                display: "-webkit-box",
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                            }}
                            gutterBottom
                            variant="h6"
                            fontWeight="normal"
                        >
                            {project.name}
                        </Typography>
                        <Box
                            sx={{
                                borderRadius: 2,
                                backgroundColor: roleColor,
                                width: "100%",
                                height: 5,
                            }}
                        ></Box>
                    </CardContent>
                </CardActionArea>
                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                    <MenuItem onClick={handleDelete} sx={{ color: "error.main" }}>
                        <Delete fontSize="small" sx={{ mr: 1 }} />
                        Delete Project
                    </MenuItem>
                </Menu>
            </Card>
        </Grid>
    );
}
