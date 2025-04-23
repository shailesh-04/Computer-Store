import api from "@/api/axios";
import { IUsers } from "@/types/User";
interface loginUser{
    email:string;
    password:string;
}
export const login = async (data:loginUser):Promise<IUsers> => {
    const responce = await api.post<IUsers>("/user/login",data);
    return responce.data;
}