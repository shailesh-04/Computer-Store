import Migration from "@utils/migration";
export interface IPayments {
    id?: string;
    order_id: string;
    method: string;
    status: 'pending' | 'paid' | 'failed' | 'refunded';
    transaction_id: string;
    paid_at?: string;
    created_at?: string;
    updated_at?: string;
}

export interface IClassPayments {
    migration: Migration;
    create(body: IPayments): Promise<any[]>;
    update(id: string, body: IPayments): Promise<any[]>;
    read(): Promise<IPayments[]>;
    readOne(id: string): Promise<IPayments[]>;
    delete(id: string): Promise<any[]>;
}
