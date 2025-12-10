import api from "../../../api";
import { AuthResponseDto, LoginDto } from "../../../schemas/authSchemas";
import { UserDto } from "../../../schemas/userSchemas";

const getUsers = async (): Promise<UserDto[]> => {
    const response = await api.get<UserDto[]>("/users");
    return response.data;
};

const getUser = async (id: string): Promise<UserDto> => {
    const response = await api.get<UserDto>(`/users/${id}`);
    return response.data;
};

export const userApi = {
    getAll: getUsers,
    getOne: getUser,
};
