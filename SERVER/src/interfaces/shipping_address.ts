import Migration from "@utils/migration";
export interface TypeShippingAddress {
    id?: string;
    demo: string;
    created_at?:string;
    updated_at?:string;
}
export interface TypeClassShippingAddress {
    migration: Migration;
}