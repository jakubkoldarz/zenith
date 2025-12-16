import { ProjectRole } from "../../../types/projectRoles";

export function useProjectRole(role?: string) {
    const canEdit = !role || role === ProjectRole.Editor || role === ProjectRole.Owner;
    const isViewer = role === ProjectRole.Viewer;

    return {
        canEdit,
        isViewer,
        role,
    };
}
