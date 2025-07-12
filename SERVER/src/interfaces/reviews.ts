import Migration from "@utils/migration";
export interface IReviews {
    id?: string;
    user_id: string;
    product_id: string;
    rating: number;
    comment: string;
    created_at?: string;
    updated_at?: string;
}

export interface IClassReviews {
    migration: Migration;
    create(body: IReviews): Promise<any[]>;
    update(id: string, body: IReviews): Promise<any[]>;
    read(): Promise<IReviews[]>;
    readOne(id: string): Promise<IReviews[]>;
    delete(id: string): Promise<any[]>;
}
