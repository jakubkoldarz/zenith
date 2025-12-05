// components/ProjectCard.tsx
import { Card, CardActionArea, CardContent, Typography, Box, useTheme } from "@mui/material";
import { ProjectDto } from "../types/projectDto";
import { RoleChip } from "./RoleChip";
import { useNavigate } from "react-router-dom";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { ProjectRole } from "../types/projectRoles";
import { useRoleColor } from "../hooks/useRoleColor";

export function ProjectCard({ project }: { project: ProjectDto }) {
    const navigate = useNavigate();
    const roleColor = useRoleColor(project.role);

    return (
        <Card sx={{ maxWidth: 345, margin: 2 }}>
            <CardActionArea onClick={() => navigate(`/projects/${project.id}`)}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
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
        </Card>
    );
}
