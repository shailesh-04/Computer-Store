import database from "@config/database";
import { IClassPayments, IPayments } from "@interfaces/payments";
import Migration from "src/utils/migration";
class Payments implements IClassPayments {
    public migration: Migration;
    constructor() {
        this.migration = new Migration("payments", {
            id: ["INT", "AUTO_INCREMENT", "PRIMARY KEY"],
            order_id: ["INT", "NOT NULL", "UNIQUE"],
            method: ["VARCHAR(50)", "NOT NULL"],
            status: ["ENUM('pending', 'paid', 'failed', 'refunded')", "NOT NULL", "DEFAULT 'pending'"],
            transaction_id: ["VARCHAR(255)"],
            paid_at: ["DATETIME"],
            created_at: ["TIMESTAMP", "DEFAULT CURRENT_TIMESTAMP"],
            updated_at: ["TIMESTAMP", "DEFAULT CURRENT_TIMESTAMP", "ON UPDATE CURRENT_TIMESTAMP"],
            FOREIGN_KEY: ["(order_id)", "REFERENCES orders(id)", "ON DELETE CASCADE"]
        });
    }

    async create(body: IPayments): Promise<any[]> {
        const { order_id, method, status, transaction_id, paid_at } = body;
        const result = await database.query(
            `INSERT INTO payments(order_id, method, status, transaction_id, paid_at) VALUES (?,?,?,?,?)`, 
            [order_id, method, status, transaction_id, paid_at]
        );
        return result;
    }

    async update(id: string, body: IPayments): Promise<any[]> {
        const { order_id, method, status, transaction_id, paid_at } = body;
        const result = await database.query(
            `UPDATE payments SET order_id=?, method=?, status=?, transaction_id=?, paid_at=? WHERE id=?`, 
            [order_id, method, status, transaction_id, paid_at, id]
        );
        return result;
    }

    // async readByOrder(order_id: string): Promise<IPayments[]> {
    //     const rows = await database.query(`SELECT * FROM payments WHERE order_id=?`, [order_id]);
    //     return rows as IPayments[];
    // }

    async readOne(id: string): Promise<IPayments[]> {
        const rows = await database.query(`SELECT * FROM payments WHERE id=?`, [id]);
        return rows as IPayments[];
    }
    async read(): Promise<IPayments[]> {
        const rows = await database.query(`SELECT * FROM payments`);
        return rows as IPayments[];
    }
    async delete(id: string): Promise<any[]> {
        const result = await database.query(`DELETE FROM payments WHERE id=?`, [id]);
        return result;
    }

    // async updateStatus(id: string, status: string, transaction_id?: string): Promise<any[]> {
    //     if (transaction_id) {
    //         const result = await database.query(
    //             `UPDATE payments SET status=?, transaction_id=? WHERE id=?`, 
    //             [status, transaction_id, id]
    //         );
    //         return result;
    //     } else {
    //         const result = await database.query(`UPDATE payments SET status=? WHERE id=?`, [status, id]);
    //         return result;
    //     }
    // }
}

const paymentsMigration = new Payments();
export const migration = paymentsMigration.migration;
export default paymentsMigration;
