import database from "@config/database";
import { IClassOders, IOrders } from "@interfaces/orders";
import Migration from "src/utils/migration";
class Orders implements IClassOders {
    public migration: Migration;
    constructor() {
        this.migration = new Migration("orders", {
            id: ["INT", "AUTO_INCREMENT", "PRIMARY KEY"],
            user_id: ["INT", "NOT NULL"],
            total: ["DECIMAL(10,2)", "NOT NULL"],
            status: ["ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled')", "NOT NULL", "DEFAULT 'pending'"],
            created_at: ["TIMESTAMP", "DEFAULT CURRENT_TIMESTAMP"],
            updated_at: ["TIMESTAMP", "DEFAULT CURRENT_TIMESTAMP", "ON UPDATE CURRENT_TIMESTAMP"],
            FOREIGN_KEY: ["(user_id)", "REFERENCES users(id)"]
        });
    }

    async create(body: IOrders): Promise<any[]> {
        const { user_id, total, status } = body;
        const result = await database.query(
            `INSERT INTO orders(user_id, total, status) VALUES (?,?,?)`, 
            [user_id, total, status]
        );
        return result;
    }

    async update(id: string, body: IOrders): Promise<any[]> {
        const { user_id, total, status } = body;
        const result = await database.query(
            `UPDATE orders SET user_id=?, total=?, status=? WHERE id=?`, 
            [user_id, total, status, id]
        );
        return result;
    }

    async read(): Promise<IOrders[]> {
        const rows = await database.query(`SELECT * FROM orders ORDER BY id DESC`);
        return rows as IOrders[];
    }

    // async readByUser(user_id: string): Promise<IOrders[]> {
    //     const rows = await database.query(`SELECT * FROM orders WHERE user_id=? ORDER BY id DESC`, [user_id]);
    //     return rows as IOrders[];
    // }

    async readOne(id: string): Promise<IOrders[]> {
        const rows = await database.query(`SELECT * FROM orders WHERE id=?`, [id]);
        return rows as IOrders[];
    }

    async delete(id: string): Promise<any[]> {
        const result = await database.query(`DELETE FROM orders WHERE id=?`, [id]);
        return result;
    }

    // async updateStatus(id: string, status: string): Promise<any[]> {
    //     const result = await database.query(`UPDATE orders SET status=? WHERE id=?`, [status, id]);
    //     return result;
    // }
}

const ordersMigration = new Orders();
export const migration = ordersMigration.migration;
export default ordersMigration;
