import axios, { AxiosError } from "axios";
import { ErrorResponseDto } from "./types/errorResponseDto";

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<any>) => {
        const errorResponse: ErrorResponseDto = {
            status: error.response?.status || 500,
            errors: error.response?.data?.errors || ["Unknown error occurred"],
        };

        return Promise.reject(errorResponse);
    }
);

export default api;
