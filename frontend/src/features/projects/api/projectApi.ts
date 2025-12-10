import api from "../../../api";
import { CreateProjectDto, ProjectDto, UpdateProjectDto } from "../types/projectSchemas";

const getProjects = async (): Promise<ProjectDto[]> => {
    const response = await api.get<ProjectDto[]>("/projects");
    return response.data;
};

const getProjectDetails = async (id: string): Promise<ProjectDto> => {
    const response = await api.get<ProjectDto>(`/projects/${id}`);
    return response.data;
};

const createProject = async (payload: CreateProjectDto): Promise<ProjectDto> => {
    const response = await api.post<ProjectDto>("/projects", payload);
    return response.data;
};

const updateProject = async ({ id, payload }: { id: string; payload: UpdateProjectDto }): Promise<ProjectDto> => {
    const response = await api.patch<ProjectDto>(`/projects/${id}`, payload);
    return response.data;
};

const deleteProject = async (id: string): Promise<void> => {
    await api.delete(`/projects/${id}`);
};

export const projectApi = {
    getOne: getProjectDetails,
    getAll: getProjects,
    create: createProject,
    update: updateProject,
    delete: deleteProject,
};
