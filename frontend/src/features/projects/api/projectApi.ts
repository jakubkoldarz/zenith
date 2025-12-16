import api from "../../../api";
import { UserWithRoleDto } from "../../users/types/userSchemas";
import {
    AssignProjectRoleDto,
    CreateProjectDto,
    ProjectDto,
    ProjectWithCategoriesDto,
    RevokeAccessDto,
    UpdateProjectDto,
} from "../types/projectSchemas";

const getProjects = async (): Promise<ProjectDto[]> => {
    const response = await api.get<ProjectDto[]>("/projects");
    return response.data;
};

const getProjectDetails = async (id: string): Promise<ProjectWithCategoriesDto> => {
    const response = await api.get<ProjectWithCategoriesDto>(`/projects/${id}`);
    return response.data;
};

const createProject = async (data: CreateProjectDto): Promise<ProjectDto> => {
    const response = await api.post<ProjectDto>("/projects", data);
    return response.data;
};

const updateProject = async ({ id, data }: { id: string; data: UpdateProjectDto }): Promise<ProjectDto> => {
    const response = await api.patch<ProjectDto>(`/projects/${id}`, data);
    return response.data;
};

const deleteProject = async (id: string): Promise<void> => {
    await api.delete(`/projects/${id}`);
};

const assingUserToProject = async (data: AssignProjectRoleDto): Promise<void> => {
    await api.put(`/projects/${data.projectId}/assign`, { userId: data.userId, role: data.role });
};

const getProjectMembers = async (projectId: string): Promise<UserWithRoleDto[]> => {
    const response = await api.get<UserWithRoleDto[]>(`/projects/${projectId}/members`);
    return response.data;
};

const revokeAccess = async (data: RevokeAccessDto): Promise<void> => {
    await api.put(`/projects/${data.projectId}/revoke`, { userId: data.userId });
};

export const projectApi = {
    getOne: getProjectDetails,
    getAll: getProjects,
    create: createProject,
    update: updateProject,
    delete: deleteProject,
    assign: assingUserToProject,
    revoke: revokeAccess,
    getMembers: getProjectMembers,
};
