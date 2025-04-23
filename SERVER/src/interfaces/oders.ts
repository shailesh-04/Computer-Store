import Migration from "@utils/migration";
export interface IOders {
    id?: string;
    demo: string;
}
export interface IClassOders {
    migration: Migration;
    create(body: IOders): Promise<any[]>;
    update(id: string, body: IOders): Promise<any[]>;
    read(): Promise<IOders[]>;
    readOne(id: string): Promise<IOders[]>;
    delete(id: string): Promise<any[]>;
}
