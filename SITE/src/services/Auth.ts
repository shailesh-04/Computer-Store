import api from "@/api/axios";
import { IUsers } from "@/types/User";
interface loginUser {
    email: string;
    password: string;
}
interface ApiResponse {
    message: string;
    data: IUsers;
    accessToken: string;
}
export const login = async (data: loginUser): Promise<ApiResponse> => {
    const response = await api.post<ApiResponse>("/auth/login", data);
    return response.data;
}
export const logout = async (): Promise<{ message: string; detail: any }> => {
    const response = await api.get<{ message: string; detail: any }>("/auth/logout");
    return response.data;
}
export const authorize = async (): Promise<ApiResponse> => {
    const accessToken = localStorage.getItem("accessToken");
    const response = await api.get<ApiResponse>("/auth", {
        headers: {
            authorization: `Bearer ${accessToken}`,
        },
    });
    return response.data;
};

export const signin = async (data: any): Promise<ApiResponse> => {
    const response = await api.post<ApiResponse>("/auth/singin", data);
    return response.data;
}