// src/services/computerService.ts
import api from "@/api/axios";
import { IComputers, ComputerRespoce} from "@/types/Computer";

export const getComputers = async (): Promise<ComputerRespoce> => {
    const response = await api.get("/computer");
    return response.data;
};

export const createComputer = async (data: IComputers): Promise<ComputerRespoce> => {
    const response = await api.post("/computer", data);
    return response.data;
};

export const editComputer = async (id: string, data: IComputers): Promise<ComputerRespoce> => {
    const response = await api.put(`/computer/${id}`, data);
    return response.data;
};

export const deleteComputer = async (id: string): Promise<ComputerRespoce> => {
    const response = await api.delete(`/computer/${id}`);
    return response.data;
};
