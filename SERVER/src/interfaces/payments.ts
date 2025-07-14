import Migration from "@utils/migration";
export interface TypePayments {
    id?: string;
    demo: string;
    created_at?:string;
    updated_at?:string;
}
export interface TypeClassPayments {
    migration: Migration;
}