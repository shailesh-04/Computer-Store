import Migration from "@utils/migration";
export interface IShipping_address {
    id?: string;
    user_id: string;
    order_id: string;
    full_name: string;
    address: string;
    city: string;
    state: string;
    zip_code: string;
    country: string;
    created_at?: string;
    updated_at?: string;
}
export interface IClassShipping_address {
    migration: Migration;
    create(body: IShipping_address): Promise<any[]>;
    update(id: string, body: IShipping_address): Promise<any[]>;
    read(): Promise<IShipping_address[]>;
    readOne(id: string): Promise<IShipping_address[]>;
    delete(id: string): Promise<any[]>;
}
