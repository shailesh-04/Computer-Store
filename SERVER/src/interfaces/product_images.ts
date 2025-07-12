import Migration from "@utils/migration";
export interface IProduct_images {
    id?: string;
    product_id: string;
    url: string;
    alt_text: string;
    created_at?: string;
    updated_at?: string;
}
export interface IClassProduct_images {
    migration: Migration;
    create(body: IProduct_images): Promise<any[]>;
    update(id: string, body: IProduct_images): Promise<any[]>;
    read(): Promise<IProduct_images[]>;
    readOne(id: string): Promise<IProduct_images[]>;
    delete(id: string): Promise<any[]>;
}
