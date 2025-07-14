import Migration from "src/utils/migration";
export interface TypeCartItems {
    id?: string;
    user_id: string;
    product_id: string;
    quantity: number;
    created_at?: string;
    updated_at?: string;
}
export interface TypeClassCartItems {
    migration: Migration;
    create(body: TypeCartItems): Promise<any[]>;
    update(id: string, body: TypeCartItems): Promise<any[]>;
    read(): Promise<TypeCartItems[]>;
    readOne(id: string): Promise<TypeCartItems[]>;
    delete(id: string): Promise<any[]>;
}
