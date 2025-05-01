import Migration from "@utils/migration";
export interface IOrders {
    id?: string;
    user_id: number;
    computer_id: number;
    quantity: number;
    total_price: number;
    status?: string;
}    
export interface IClassOders {
    migration: Migration;
    create(body: IOrders): Promise<any[]>;
    update(id: string, body: IOrders): Promise<any[]>;
    read(): Promise<IOrders[]>;
    readOne(id: string): Promise<IOrders[]>;
    delete(id: string): Promise<any[]>;
}
