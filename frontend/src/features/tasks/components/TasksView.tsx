import { Box, Stack, Typography, useTheme } from "@mui/material";
import useCategoryTasks from "../hooks/useCategoryTasks";
import { CategoryDto } from "../../categories/types/categoriesSchemas";
import TaskView from "./TaskView";
import { getScrollbarStyles } from "../../../components/ui/Scrollbar";
import { TaskDto } from "../types/tasksSchemas";
import { Droppable } from "@hello-pangea/dnd";

export default function TasksView({
    category,
    onSelect,
    canEdit,
}: {
    category: CategoryDto;
    onSelect: (task: TaskDto) => void;
    canEdit: boolean;
}) {
    const { tasks } = useCategoryTasks(category.projectId, category.id);
    const theme = useTheme();
    const isEmpty = tasks.length === 0;

    return (
        <Droppable droppableId={category.id} type="TASK">
            {(provided, snapshot) => (
                <Stack
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    gap={1}
                    sx={{
                        overflowY: "auto",
                        padding: 1,
                        minHeight: "150px",
                        backgroundColor: snapshot.isDraggingOver ? "rgba(0, 123, 255, 0.1)" : "transparent",
                        transition: "background-color 0.2s ease",
                        ...getScrollbarStyles(theme),
                    }}
                >
                    {isEmpty && !snapshot.isDraggingOver && canEdit && (
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                height: "100%",
                                minHeight: "130px",
                                border: "2px dashed",
                                borderColor: "divider",
                                borderRadius: 1,
                                opacity: 0.5,
                            }}
                        >
                            <Typography variant="body2" color="text.secondary">
                                Drop task here
                            </Typography>
                        </Box>
                    )}
                    {tasks.map((task, index) => (
                        <TaskView
                            key={task.id}
                            task={task}
                            index={index}
                            projectId={category.projectId}
                            onClick={onSelect}
                            canEdit={canEdit}
                        />
                    ))}
                    {provided.placeholder}
                </Stack>
            )}
        </Droppable>
    );
}
