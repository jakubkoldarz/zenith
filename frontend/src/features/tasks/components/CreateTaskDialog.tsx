import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    Button,
    Box,
    useTheme,
    alpha,
    Stack,
    TextareaAutosize,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateTaskDto, CreateTaskSchema } from "../types/tasksSchemas";
import useCreateTask from "../hooks/useCreateTask";

export function CreateTaskDialog({
    open,
    onClose,
    projectId,
    categoryId,
}: {
    open: boolean;
    onClose: () => void;
    projectId: string;
    categoryId: string;
}) {
    const theme = useTheme();
    const { createTask, isPending: loading } = useCreateTask(projectId, categoryId);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<CreateTaskDto>({
        resolver: zodResolver(CreateTaskSchema),
    });

    const handleClose = () => {
        reset();
        onClose();
    };

    const onSubmit = (data: CreateTaskDto) => {
        createTask(data, { onSuccess: handleClose });
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
            <DialogTitle sx={{ fontWeight: "bold", fontSize: "1.4rem" }}>New Task</DialogTitle>

            <DialogContent>
                <Box
                    onSubmit={handleSubmit(onSubmit)}
                    component="form"
                    sx={{ mt: 1, display: "flex", flexDirection: "column", gap: 2 }}
                >
                    <TextField
                        autoFocus
                        label="Task Title"
                        fullWidth
                        variant="outlined"
                        {...register("title")}
                        error={!!errors.title}
                        helperText={errors.title ? "Task title is required" : ""}
                    />
                    <TextField
                        label="Task Description"
                        fullWidth
                        multiline
                        variant="outlined"
                        {...register("description")}
                        minRows={4}
                        error={!!errors.description}
                        helperText={errors?.description ? "" : ""}
                    />
                    <TextField sx={{ display: "none" }} type="hidden" value={categoryId} {...register("categoryId")} />
                    <Stack direction="row" spacing={2} justifyContent="flex-end" marginTop={3}>
                        <Button onClick={handleClose} disabled={loading} color="inherit">
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            loading={loading}
                            variant="contained"
                            sx={{
                                fontWeight: "bold",
                                px: 4,
                                borderRadius: "8px",
                            }}
                        >
                            Create Task
                        </Button>
                    </Stack>
                </Box>
            </DialogContent>
        </Dialog>
    );
}
