import { Dialog, DialogTitle, DialogContent, TextField, Button, Box, useTheme, alpha, Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateCategoryDto, CreateCategorySchema } from "../types/categoriesSchemas";
import { useCreateCategory } from "../hooks/useCreateCategory";

export function CreateCategoryDialog({
    open,
    onClose,
    projectId,
}: {
    open: boolean;
    onClose: () => void;
    projectId: string;
}) {
    const theme = useTheme();
    const { createCategory, isPending: loading } = useCreateCategory();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<CreateCategoryDto>({
        resolver: zodResolver(CreateCategorySchema),
    });

    const handleClose = () => {
        reset();
        onClose();
    };

    const onSubmit = (data: CreateCategoryDto) => {
        createCategory(data, { onSuccess: handleClose });
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
            <DialogTitle sx={{ fontWeight: "bold", fontSize: "1.4rem" }}>New Category</DialogTitle>

            <DialogContent>
                <Box
                    onSubmit={handleSubmit(onSubmit)}
                    component="form"
                    sx={{ mt: 1, display: "flex", flexDirection: "column", gap: 2 }}
                >
                    <TextField
                        autoFocus
                        label="Category Name"
                        fullWidth
                        variant="outlined"
                        {...register("name")}
                        error={!!errors.name}
                        helperText={errors.name ? "Category name is required" : ""}
                    />
                    <TextField sx={{ display: "none" }} type="hidden" value={projectId} {...register("projectId")} />
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
                            Create Category
                        </Button>
                    </Stack>
                </Box>
            </DialogContent>
        </Dialog>
    );
}
