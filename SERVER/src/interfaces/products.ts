import Migration from "@utils/migration";
export interface IProducts {
    id?: string;
    name: string;
    description: string;
    brand: string;
    category_id: string;
    price: number;
    quantity: number;
    thumbnail: string;
    created_at?: string;
    updated_at?: string;
}
export interface IClassProducts {
    migration: Migration;
    create(body: IProducts): Promise<any[]>;
    update(id: string, body: IProducts): Promise<any[]>;
    read(): Promise<IProducts[]>;
    delete(id: string): Promise<any[]>;
    readOne(id: string): Promise<IProducts[]>;
}