import { Grid } from "@mui/material";
import { ProjectCard } from "./ProjectCard";
import { ProjectDto } from "../schemas/projectSchemas";

export default function ProjectList({ projects }: { projects: ProjectDto[] }) {
    return (
        <Grid container spacing={2}>
            {projects.map((project) => {
                return <ProjectCard key={project.id} project={project} />;
            })}
        </Grid>
    );
}
