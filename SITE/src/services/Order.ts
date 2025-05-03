import api from "@/api/axios";
import { IOrders, OrderRespoce } from "@/types/Order";

export const order = async (data: IOrders): Promise<OrderRespoce> => {
    const respoce = await api.post("/order/order", data);
    return respoce.data;
}
export const usrOrder = async (id:string): Promise<{orders:IOrders[]}> => {
    const respoce = await api.get(`/order/${id}/user`);
    return respoce.data;
}