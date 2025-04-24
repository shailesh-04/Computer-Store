import api from "@/api/axios";
import { IComputers } from "@/types/Computer";
interface ApiResponse{
    message:string;
    data:IComputers;
}
export const getComputer = async (): Promise<IComputers[]> => {
    const responce = await api.get<IComputers[]>("/computer");
    return responce.data;
}       