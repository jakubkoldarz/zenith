import api from "../../../api";
import { SearchUserDto, UserDto } from "../types/userSchemas";

const getUsers = async (query: string | null): Promise<UserDto[]> => {
    if (query === null || query.trim() === "" || query.length < 3) {
        return [];
    }
    const response = await api.get<UserDto[]>(`/users?search=${query}`);
    return response.data;
};

const getUser = async (id: string): Promise<UserDto> => {
    const response = await api.get<UserDto>(`/users/${id}`);
    return response.data;
};

export const userApi = {
    search: getUsers,
    getOne: getUser,
};
