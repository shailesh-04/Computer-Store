export interface IComputers{
    id?:string;
    brand:string;
    model:string;
    processor?:string;
    ram?:string;
    storage?:string;
    graphics_card?:string;
    operating_system?:string;
    screen_size?:string;
    price:number;
    stock_quantity?:number;
    descrition?:string;
    image?:string;
    created_at?:string;
    updated_at?:string;
}
export interface ComputerRespoce{
    message?:string;
    computer?:IComputers|IComputers[];
    detail?:string;
}