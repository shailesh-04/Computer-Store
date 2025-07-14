import Migration from "@utils/migration";
export interface TypeReviews {
    id?: string;
    demo: string;
    created_at?:string;
    updated_at?:string;
}
export interface TypeClassReviews {
    migration: Migration;
}