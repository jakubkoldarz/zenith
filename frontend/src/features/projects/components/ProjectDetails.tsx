import { useNavigate, useParams } from "react-router-dom";
import {
    AppBar,
    Backdrop,
    Box,
    Button,
    CircularProgress,
    Container,
    Stack,
    Toolbar,
    Typography,
    useTheme,
} from "@mui/material";
import { ArrowBack, ErrorOutline, PersonAdd } from "@mui/icons-material";
import { useProjectDetails } from "../hooks/useProjectDetails";
import { useUpdateProject } from "../hooks/useUpdateProject";
import EditBox from "../../../components/EditBox";

interface ProjectDetailsParams extends Record<string, string | undefined> {
    id: string;
}

export default function ProjectDetails() {
    const { id } = useParams<ProjectDetailsParams>();
    const theme = useTheme();
    const navigate = useNavigate();
    const { project, isLoading, isError, refetch } = useProjectDetails(id!);
    const { mutateAsync: updateProject, isPending: loadingUpdate } = useUpdateProject();

    const handleChangeProjectName = async (newName: string) => {
        await updateProject({ id: id!, payload: { name: newName } });
    };
    const handleRetry = () => {
        refetch();
    };

    if (isLoading) {
        return (
            <Backdrop open={isLoading}>
                <CircularProgress />
                <Typography variant="h6" marginLeft={2} color="primary">
                    Loading project details...
                </Typography>
            </Backdrop>
        );
    }

    if (isError) {
        return (
            <Container maxWidth="sm">
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "80vh",
                        textAlign: "center",
                        gap: 2,
                    }}
                >
                    <ErrorOutline sx={{ fontSize: 100, color: "text.secondary", opacity: 0.5 }} />

                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                        Ooops! We couldn't locate your project.
                    </Typography>

                    <Typography variant="body1" color="text.secondary">
                        We couldn't find the project you're looking for. It might have been deleted, or perhaps it never
                        existed in our plain of existence.
                    </Typography>

                    <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                        <Button variant="text" startIcon={<ArrowBack />} onClick={() => navigate("/projects")}>
                            Go Back
                        </Button>
                        <Button variant="contained" color="primary" onClick={handleRetry}>
                            Try Again
                        </Button>
                    </Box>
                </Box>
            </Container>
        );
    }

    return (
        <>
            <Stack
                direction="column"
                borderRadius={2}
                overflow="hidden"
                sx={{
                    background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.main})`,
                }}
            >
                <AppBar position="static" sx={{ backgroundColor: "rgba(0,0,0,0.6)" }}>
                    <Toolbar>
                        <EditBox value={project?.name} onSetValue={handleChangeProjectName} />
                        {loadingUpdate && <CircularProgress color="inherit" size={24} />}
                        <Box flexGrow={1} />
                        <Button variant="contained" startIcon={<PersonAdd />}>
                            Share Project
                        </Button>
                    </Toolbar>
                </AppBar>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum neque, quo omnis ratione officia
                    laboriosam odit? Ullam suscipit, dolor quisquam alias magnam natus sed fugit reiciendis culpa
                    dolore, minima dolorem nobis error ratione aperiam voluptate asperiores assumenda nam ut? Pariatur
                    obcaecati placeat dolore cupiditate officia autem perferendis magnam similique quasi.
                </p>
            </Stack>
        </>
    );
}
