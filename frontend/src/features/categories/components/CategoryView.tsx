import { Box, Divider, IconButton, Menu, MenuItem, Stack, useTheme } from "@mui/material";
import { CategoryDto } from "../types/categoriesSchemas";
import TasksView from "../../tasks/components/TasksView";
import EditBox from "../../../components/EditBox";
import useUpdateCategory from "../hooks/useUpdateCategory";
import { GlassButton } from "../../../components/ui/GlassButton";
import { Add, Delete, MoreVert } from "@mui/icons-material";
import useCategoryTasks from "../../tasks/hooks/useCategoryTasks";
import { CreateTaskDialog } from "../../tasks/components/CreateTaskDialog";
import { useState } from "react";
import { UpdateTaskDialog } from "../../tasks/components/UpdateTaskDialog";
import { TaskDto } from "../../tasks/types/tasksSchemas";
import { Draggable } from "@hello-pangea/dnd";
import useDeleteCategory from "../hooks/useDeleteCategory";

export default function CategoryView({
    category,
    index,
    canEdit,
}: {
    category: CategoryDto;
    index: number;
    canEdit: boolean;
}) {
    const [openUpdate, setOpenUpdate] = useState<boolean>(false);
    const [openCreate, setOpenCreate] = useState<boolean>(false);
    const [selectedTask, setSelectedTask] = useState<TaskDto | null>(null);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const theme = useTheme();
    const { updateCategory } = useUpdateCategory();
    const { tasks } = useCategoryTasks(category.projectId, category.id);
    const { mutate: deleteCategory } = useDeleteCategory(category.projectId);

    const handleSetName = (newName: string) => {
        updateCategory({
            id: category.id!,
            projectId: category.projectId!,
            data: { name: newName },
        });
    };

    const handleSelectTask = (task: TaskDto) => {
        setSelectedTask(task);
        if (task) {
            setOpenUpdate(true);
        }
    };

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleDelete = () => {
        deleteCategory(category.id);
        handleMenuClose();
    };

    return (
        <>
            <Draggable draggableId={category.id} index={index} isDragDisabled={!canEdit}>
                {(provided, snapshot) => (
                    <Stack
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        direction="column"
                        sx={{
                            flexShrink: 0,
                            width: "300px",
                            backgroundColor: theme.palette.background.paper,
                            padding: 2,
                            borderRadius: 2,
                            maxHeight: "100%",
                            display: "flex",
                            flexDirection: "column",
                            boxShadow: snapshot.isDragging ? 6 : theme.shadows[3],
                            opacity: snapshot.isDragging ? 0.9 : 1,
                        }}
                        spacing={2}
                    >
                        <Stack direction="row" alignItems="center" gap={1} flexShrink={0}>
                            <Box flexGrow={1} {...(canEdit ? provided.dragHandleProps : {})}>
                                <EditBox value={category.name} onSetValue={handleSetName} disabled={!canEdit} />
                            </Box>
                            {canEdit && (
                                <IconButton
                                    size="small"
                                    onClick={handleMenuOpen}
                                    sx={{
                                        opacity: 0.7,
                                        "&:hover": { opacity: 1 },
                                    }}
                                >
                                    <MoreVert fontSize="small" />
                                </IconButton>
                            )}
                        </Stack>
                        <Divider sx={{ paddingBottom: 1, marginTop: "0 !important", paddingTop: 0 }} />

                        <Stack direction="column" sx={{ overflowY: "auto", minHeight: 0, flexGrow: 1 }}>
                            <TasksView onSelect={handleSelectTask} category={category} canEdit={canEdit} />
                        </Stack>

                        {tasks.length > 0 && <Divider />}
                        {canEdit && (
                            <GlassButton
                                onClick={() => setOpenCreate(true)}
                                color="inherit"
                                size="small"
                                startIcon={<Add />}
                            >
                                Add Task
                            </GlassButton>
                        )}
                    </Stack>
                )}
            </Draggable>
            {canEdit && (
                <>
                    <CreateTaskDialog
                        categoryId={category.id}
                        projectId={category.projectId}
                        open={openCreate}
                        onClose={() => setOpenCreate(false)}
                    />
                    <UpdateTaskDialog
                        key={selectedTask?.id || "new"}
                        open={openUpdate}
                        onClose={() => {
                            setOpenUpdate(false);
                            setSelectedTask(null);
                        }}
                        task={selectedTask}
                        projectId={category.projectId}
                    />
                    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                        <MenuItem onClick={handleDelete} sx={{ color: "error.main" }}>
                            <Delete fontSize="small" sx={{ mr: 1 }} />
                            Delete Category
                        </MenuItem>
                    </Menu>
                </>
            )}
        </>
    );
}
