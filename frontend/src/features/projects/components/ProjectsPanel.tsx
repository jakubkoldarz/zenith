import { Backdrop, CircularProgress, Divider, Stack, Typography } from "@mui/material";
import { Activity } from "react";
import ProjectList from "./ProjectsList";
import { useProjects } from "../hooks/useProjects";

export default function ProjectsPanel() {
    const { userProjects, sharedProjects, isLoading } = useProjects();

    return (
        <Stack direction="column">
            <Backdrop open={isLoading}>
                <CircularProgress />
                <Typography variant="h6" color="primary" marginLeft={2}>
                    Loading projects...
                </Typography>
            </Backdrop>

            <Stack direction="column" mt={0}>
                <Typography variant="h5" fontWeight="normal" gutterBottom>
                    Your Projects
                </Typography>
                <Divider sx={{ marginBottom: 2 }} />
                <ProjectList projects={userProjects} />
            </Stack>

            <Activity mode={sharedProjects.length > 0 ? "visible" : "hidden"}>
                <Stack direction="column" mt={0}>
                    <Typography variant="h5" fontWeight="normal" gutterBottom marginTop={4}>
                        Shared With You
                    </Typography>
                    <Divider sx={{ marginBottom: 2 }} />
                    <ProjectList projects={sharedProjects} />
                </Stack>
            </Activity>
        </Stack>
    );
}
