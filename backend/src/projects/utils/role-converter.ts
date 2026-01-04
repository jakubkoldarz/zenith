import { Role } from '@prisma/client';

// Convert Prisma Role enum (OWNER, EDITOR, VIEWER) to frontend format (Owner, Editor, Viewer)
export function convertRoleToFrontend(role: Role): string {
    const roleMap: Record<Role, string> = {
        [Role.OWNER]: 'Owner',
        [Role.EDITOR]: 'Editor',
        [Role.VIEWER]: 'Viewer',
    };
    return roleMap[role];
}

// Convert frontend role format (Owner, Editor, Viewer) to Prisma Role enum (OWNER, EDITOR, VIEWER)
export function convertRoleFromFrontend(role: string): Role {
    const roleMap: Record<string, Role> = {
        Owner: Role.OWNER,
        Editor: Role.EDITOR,
        Viewer: Role.VIEWER,
    };

    return roleMap[role] || (role as unknown as Role);
}
