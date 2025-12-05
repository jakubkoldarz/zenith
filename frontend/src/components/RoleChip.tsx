import { Chip, useTheme } from "@mui/material";
import { ProjectRole } from "../types/projectRoles";
import { useRoleColor } from "../hooks/useRoleColor";

export function RoleChip({ role }: { role: ProjectRole }) {
    const theme = useTheme();
    const roleColor = useRoleColor(role);
    const color = roleColor ?? theme.palette.primary.main;
    const roleLabel = role ?? "Unknown";

    return <Chip variant="filled" size="small" label={roleLabel} style={{ backgroundColor: color }} />;
}
