import { useEffect, useState } from "react";
import AppHeader from "../components/AppHeader";
import { ProjectDto } from "../types/projectDto";
import { ProjectCard } from "../components/ProjectCard";
import api from "../api";
import { Stack } from "@mui/material";
import { CreateProjectDialog } from "../components/CreateProjectDialog";
import { useApi } from "../hooks/useApi";

export default function DashboardPage() {
    const [projects, setProjects] = useState<ProjectDto[]>([]);
    const [openCreateDialog, setOpenCreateDialog] = useState<boolean>(false);
    const { data, error, loading, execute } = useApi<ProjectDto[]>();

    useEffect(() => {
        (async () => {
            try {
                const response = await execute("get", "projects");
                setProjects([...response]);
            } catch (err) {}
        })();
    }, []);

    const handleProjectCreated = (newProject: ProjectDto) => {
        setProjects((prevProjects) => [newProject, ...prevProjects]);
    };

    return (
        <>
            <AppHeader onOpenCreateDialog={() => setOpenCreateDialog(true)} />
            <Stack direction="row" spacing={2} margin={2}>
                <h1>Dashboard</h1>
            </Stack>
            <Stack direction="row" spacing={2} margin={2} flexWrap="wrap">
                {projects.map((project) => {
                    return <ProjectCard key={project.id} project={project} />;
                })}
            </Stack>
            <CreateProjectDialog
                open={openCreateDialog}
                onClose={() => setOpenCreateDialog(false)}
                onProjectCreated={handleProjectCreated}
            />
        </>
    );
}
