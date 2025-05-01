export interface IOrders {
    id?: string;
    user_id: number;
    computer_id: number;
    quantity: number;
    total_price: number;
    status?: string;
}  
export interface OrderRespoce{
    message?:string;
    orders?:IOrders|IOrders[];
    detail?:string;
}