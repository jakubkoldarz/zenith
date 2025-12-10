import { Outlet } from "react-router-dom";
import AppHeader from "../AppHeader";
import { Grid } from "@mui/material";
import SideMenu from "../SideMenu";
import { CreateProjectDialog } from "../CreateProjectDialog";
import { ProjectDto, UpdateProjectDto } from "../../features/projects/types/projectSchemas";
import { useState } from "react";

export type ProjectContextType = {
    userProjects: ProjectDto[];
    sharedProjects: ProjectDto[];
    loadingProjects: boolean;
    updateProjectInList: (projectId: string, updatedFields: UpdateProjectDto) => void;
};

export default function MainLayout() {
    const [openCreateDialog, setOpenCreateDialog] = useState<boolean>(false);

    return (
        <>
            <AppHeader onOpenCreateDialog={() => setOpenCreateDialog(true)} />
            <Grid container spacing={2} margin={2}>
                <Grid size={{ xs: 12, md: 3, lg: 2 }} display="flex" justifyContent="center">
                    <SideMenu />
                </Grid>
                <Grid size={{ xs: 12, md: 9, lg: 10 }} px={2}>
                    <Outlet />
                </Grid>
            </Grid>
            <CreateProjectDialog open={openCreateDialog} onClose={() => setOpenCreateDialog(false)} />
        </>
    );
}
