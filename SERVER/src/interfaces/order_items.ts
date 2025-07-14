import Migration from "@utils/migration";
export interface TypeOrderItems {
    id?: string;
    order_id: string;
    product_id: string;
    quantity: number;
    price: number;
    created_at?: string;
    updated_at?: string;
}
export interface TypeClassOrderItems {
    migration: Migration;
    create(body: TypeOrderItems): Promise<any[]>;
    update(id: string, body: TypeOrderItems): Promise<any[]>;
    read(): Promise<TypeOrderItems[]>;
    readOne(id: string): Promise<TypeOrderItems[]>;
    delete(id: string): Promise<any[]>;
}
