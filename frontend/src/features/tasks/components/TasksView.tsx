import { Stack } from "@mui/material";
import useCategoryTasks from "../hooks/useCategoryTasks";
import { CategoryDto } from "../../categories/types/categoriesSchemas";
import TaskView from "./TaskView";

export default function TasksView({ category }: { category: CategoryDto }) {
    const { tasks } = useCategoryTasks(category.projectId, category.id);

    return (
        <Stack sx={{ padding: 1 }} gap={1}>
            {tasks.map((task) => (
                <TaskView key={task.id} task={task} />
            ))}
        </Stack>
    );
}
