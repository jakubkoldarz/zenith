import { Dialog, DialogTitle, DialogContent, TextField, Button, Box, useTheme, alpha, Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateProjectDto, CreateProjectSchema } from "../features/projects/types/projectSchemas";
import { useCreateProject } from "../features/projects/hooks/useCreateProject";

interface CreateProjectDialogProps {
    open: boolean;
    onClose: () => void;
}

export function CreateProjectDialog({ open, onClose }: CreateProjectDialogProps) {
    const theme = useTheme();
    const { isPending: loading, createProject } = useCreateProject();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<CreateProjectDto>({
        resolver: zodResolver(CreateProjectSchema),
    });

    const handleClose = () => {
        reset();
        onClose();
    };

    const onSubmit = async (data: CreateProjectDto) => {
        await createProject({ name: data.name });
        handleClose();
    };

    return (
        <Dialog
            open={open}
            onClose={loading ? undefined : handleClose}
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
            <DialogTitle sx={{ fontWeight: "bold", fontSize: "1.4rem" }}>New Project</DialogTitle>

            <DialogContent>
                <Box
                    onSubmit={handleSubmit(onSubmit)}
                    component="form"
                    sx={{ mt: 1, display: "flex", flexDirection: "column", gap: 2 }}
                >
                    <TextField
                        autoFocus
                        label="Project Name"
                        fullWidth
                        variant="outlined"
                        {...register("name")}
                        error={!!errors.name}
                        helperText={errors.name ? "Project name is required" : ""}
                    />
                    <Stack direction="row" spacing={2} justifyContent="flex-end" marginTop={3}>
                        <Button onClick={handleClose} disabled={loading} color="inherit">
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{
                                fontWeight: "bold",
                                px: 4,
                                borderRadius: "8px",
                            }}
                        >
                            {loading ? "Creating..." : "Create Project"}
                        </Button>
                    </Stack>
                </Box>
            </DialogContent>
        </Dialog>
    );
}
