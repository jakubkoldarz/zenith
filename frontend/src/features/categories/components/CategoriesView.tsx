import { CircularProgress, Stack, Typography } from "@mui/material";
import { CategoryWithTasksDto } from "../types/categoriesSchemas";
import CategoryView from "./CategoryView";
import { Add } from "@mui/icons-material";
import { GlassButton } from "../../../components/ui/GlassButton";
import { CreateCategoryDialog } from "./CreateCategoryDialog";
import { useState } from "react";
import useCategories from "../hooks/useCategories";
import { Droppable } from "@hello-pangea/dnd";

export default function CategoriesView({ projectId, canEdit }: { projectId: string; canEdit: boolean }) {
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const { categories, isLoading, isError } = useCategories(projectId);

    function handleCreateCategory() {
        setIsCreateDialogOpen(true);
    }

    if (isLoading) {
        return <CircularProgress />;
    }

    if (isError) {
        return <Typography color="error">Failed to load categories</Typography>;
    }

    if (!categories || categories.length === 0) {
        return (
            <>
                <Stack direction="row" sx={{ minHeight: "60vh" }}>
                    {canEdit && (
                        <GlassButton
                            onClick={handleCreateCategory}
                            variant="contained"
                            sx={{ height: "fit-content", minWidth: "250px", justifyContent: "left", flexShrink: 0 }}
                            color="primary"
                            startIcon={<Add />}
                        >
                            Add Task Category
                        </GlassButton>
                    )}
                    {!canEdit && (
                        <Typography variant="h6" color="text.secondary">
                            No categories yet
                        </Typography>
                    )}
                </Stack>
                {canEdit && (
                    <CreateCategoryDialog
                        projectId={projectId}
                        open={isCreateDialogOpen}
                        onClose={() => setIsCreateDialogOpen(false)}
                    />
                )}
            </>
        );
    }

    return (
        <>
            <Droppable droppableId="categories" type="CATEGORY" direction="horizontal">
                {(provided) => (
                    <Stack
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        direction="row"
                        sx={{
                            height: "100%",
                            gap: 2,
                            alignItems: "flex-start",
                            paddingRight: 6,
                            width: "fit-content",
                        }}
                    >
                        {categories.map((category, index) => (
                            <CategoryView key={category.id} category={category} index={index} canEdit={canEdit} />
                        ))}
                        {provided.placeholder}
                        {canEdit && (
                            <GlassButton
                                onClick={handleCreateCategory}
                                variant="contained"
                                sx={{ height: "fit-content", minWidth: "250px", justifyContent: "left", flexShrink: 0 }}
                                color="primary"
                                startIcon={<Add />}
                            >
                                Add Task Category
                            </GlassButton>
                        )}
                    </Stack>
                )}
            </Droppable>
            {canEdit && (
                <CreateCategoryDialog
                    projectId={projectId}
                    open={isCreateDialogOpen}
                    onClose={() => setIsCreateDialogOpen(false)}
                />
            )}
        </>
    );
}
