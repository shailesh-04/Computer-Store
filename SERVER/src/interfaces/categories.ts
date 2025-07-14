import Migration from "src/utils/migration";
export interface TypeCategories {
    id?: string;
    name: string;
    slug: string;
    created_at?: string;
    updated_at?: string;
}
export interface TypeClassCategories {
    migration: Migration;
    create(body: TypeCategories): Promise<any[]>;
    update(id: string, body: TypeCategories): Promise<any[]>;
    read(): Promise<TypeCategories[]>;
    readOne(id: string): Promise<TypeCategories[]>;
    delete(id: string): Promise<any[]>;
}
