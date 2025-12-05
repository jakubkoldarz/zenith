import { useTheme } from "@mui/material";
import { ProjectRole } from "../types/projectRoles";

export function useRoleColor(role: ProjectRole): string {
    const theme = useTheme();

    const roleColors: Record<ProjectRole, string> = {
        [ProjectRole.Owner]: theme.palette.roles.owner,
        [ProjectRole.Editor]: theme.palette.roles.editor,
        [ProjectRole.Viewer]: theme.palette.roles.viewer,
    };
    return roleColors[role];
}
