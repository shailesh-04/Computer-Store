import api from "@/api/axios";
import { UserRespoce } from "@/types/Respoce";
import { IUsers } from "@/types/User";

export const _getUsers = async (): Promise<UserRespoce> => {
    const responce = await api.get(`/user/`)
    return responce.data;
}
export const _editProfile = async (id: string, data: IUsers): Promise<UserRespoce> => {
    const responce = await api.put(`/user/${id}`, data)
    return responce.data;
}
export const _deleteUser = async (id:string):Promise<UserRespoce>=>{
    const responce = await api.delete<UserRespoce>(`/user/${id}`);
    return responce.data;
}
export const _createUser = async (data:IUsers): Promise<UserRespoce> => {
    const response = await api.post<UserRespoce>("/auth/singin", data);
    return response.data;
}

