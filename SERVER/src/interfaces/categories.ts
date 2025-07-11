import Migration from "src/utils/migration";
export interface ICategories {
    id?: string;
    demo: string;
    created_at?:string;
    updated_at?:string;
}
export interface IClassCategories {
    migration: Migration;
    create(body: ICategories): Promise<any[]>;
    update(id: string, body: ICategories): Promise<any[]>;
    read(): Promise<ICategories[]>;
    readOne(id: string): Promise<ICategories[]>;
    delete(id: string): Promise<any[]>;
}
