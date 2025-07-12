import Migration from "@utils/migration";
export interface IOrders {
    id?: string;
    user_id: string;
    total: number;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    created_at?: string;
    updated_at?: string;
}
export interface IClassOders {
    migration: Migration;
    create(body: IOrders): Promise<any[]>;
    update(id: string, body: IOrders): Promise<any[]>;
    read(): Promise<IOrders[]>;
    readOne(id: string): Promise<IOrders[]>;
    delete(id: string): Promise<any[]>;
}
