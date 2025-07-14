import Migration from "@utils/migration";
export interface TypeProductImages {
    id?: string;
    demo: string;
    created_at?:string;
    updated_at?:string;
}
export interface TypeClassProductImages {
    migration: Migration;
}