import Migration from "@utils/migration";
export interface TypeUsers {
    id?: string;
    demo: string;
    created_at?:string;
    updated_at?:string;
}
export interface TypeClassUsers {
    migration: Migration;
}