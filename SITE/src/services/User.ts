import api from "@/api/axios";
import { IUsers } from "@/types/User";
interface loginUser{
    email:string;
    password:string;
}
interface ApiResponse{
    message:string;
    data:IUsers;
}
export const login = async (data:loginUser):Promise<ApiResponse> => {
    const response = await api.post<ApiResponse>("/user/login",data);
    return response.data;
}