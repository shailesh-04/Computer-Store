import Migration from "src/utils/migration";
export interface ICart_items {
    id?: string;
    demo: string;
    created_at?:string;
    updated_at?:string;
}
export interface IClassCart_items {
    migration: Migration;
    create(body: ICart_items): Promise<any[]>;
    update(id: string, body: ICart_items): Promise<any[]>;
    read(): Promise<ICart_items[]>;
    readOne(id: string): Promise<ICart_items[]>;
    delete(id: string): Promise<any[]>;
}
