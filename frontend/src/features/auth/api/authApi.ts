import api from "../../../api";
import { AuthResponseDto, LoginDto, RegisterDto } from "../types/authSchemas";
import { UserDto } from "../../users/types/userSchemas";

const loginUser = async (data: LoginDto): Promise<AuthResponseDto> => {
    const response = await api.post<AuthResponseDto>("/auth/login", data);
    return response.data;
};

const registerUser = async (data: RegisterDto): Promise<void> => {
    await api.post("/auth/register", data);
};

const getUserProfile = async (): Promise<UserDto> => {
    const token = localStorage.getItem("authToken");
    if (!token) return Promise.reject("No auth token found");

    const response = await api.get<UserDto>("/users/me");
    return response.data;
};

export const authApi = {
    login: loginUser,
    register: registerUser,
    getProfile: getUserProfile,
};
