import Migration from "@utils/migration";
export interface IOrder_items {
    id?: string;
    demo: string;
    created_at?:string;
    updated_at?:string;
}
export interface IClassOrder_items {
    migration: Migration;
    create(body: IOrder_items): Promise<any[]>;
    update(id: string, body: IOrder_items): Promise<any[]>;
    read(): Promise<IOrder_items[]>;
    readOne(id: string): Promise<IOrder_items[]>;
    delete(id: string): Promise<any[]>;
}
