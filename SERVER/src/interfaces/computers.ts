import Migration from "@utils/migration";
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
    created_at?:string;
    updated_at?:string;
}
export interface IClassComputers{
    migration:Migration;
    create(body:IComputers):Promise<any[]>;
    update(id:string,body:IComputers):Promise<any[]>;
    read():Promise<IComputers[]>;
    delete(id:string):Promise<any[]>;
    readOne(id:string):Promise<IComputers[]>;
}