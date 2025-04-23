import Migration from "@utils/migration";
export interface IUsers {
    id?: string;
    name:string;
    email:string;
    password:string;
    image?:string;
    created_at?:string;
    updated_at?:string;
}
export interface IClassUsers {
    migration: Migration;
    create(body: IUsers): Promise<any[]>;
    update(id: string, body: IUsers): Promise<any[]>;
    read(): Promise<IUsers[]>;
    readOne(id: string): Promise<IUsers[]>;
    delete(id: string): Promise<any[]>;
}
