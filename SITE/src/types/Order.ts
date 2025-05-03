import { IComputers } from "./Computer";

export interface IOrders extends IComputers {
    id?: string;
    user_id: string;
    computer_id: string;
    quantity: number;
    total_price: number;
    status?: string;
}  
export interface OrderRespoce{
    message?:string;
    orders?:IOrders|IOrders[];
    detail?:string;
}