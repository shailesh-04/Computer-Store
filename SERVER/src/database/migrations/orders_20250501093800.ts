import database from "@config/database";
import { IClassOders, IOrders } from "@interfaces/orders";
import Migration from "src/utils/migration";
class orders implements IClassOders {
    public migration: Migration;
    constructor() {
        this.migration = new Migration("orders", {
            id: ["INT", "AUTO_INCREMENT", "PRIMARY KEY"],
            user_id: ["INT", "NOT NULL"], 
            computer_id: ["INT", "NOT NULL"],
            quantity: ["INT", "NOT NULL", "DEFAULT 1"],
            total_price: ["DECIMAL(10,2)", "NOT NULL"],
            status: ["VARCHAR(50)", "DEFAULT 'pending'"],  //pending, shipped, delivered, cancelled
            created_at: ["TIMESTAMP", "DEFAULT CURRENT_TIMESTAMP"],
            updated_at: ["TIMESTAMP", "DEFAULT CURRENT_TIMESTAMP", "ON UPDATE CURRENT_TIMESTAMP"]
        }, [
            "FOREIGN KEY (customer_id) REFERENCES customers(id)",
            "FOREIGN KEY (computer_id) REFERENCES computers(id)"
        ]);
        ;
    }
    async create(body: IOrders): Promise<any[]> {
        const { user_id,computer_id,quantity,total_price,status} = body;
        const result = await database.query(`INSERT INTO orders(demo) VALUES (?)`, [ user_id,computer_id,quantity,total_price,status]);
        return result;
    }
    async update(id: string, body: IOrders): Promise<any[]> {
        const {  user_id,computer_id,quantity,total_price,status } = body;
        const result = await database.query(`UPDATE orders SET demo = ? WHERE id = ?`, [ user_id,computer_id,quantity,total_price,status, id]);
        return result;
    }
    async read(): Promise<IOrders[]> {
        const rows = await database.query(`SELECT * FROM orders ORDER BY id DESC`);
        return rows as IOrders[];
    }
    async readOne(id: string): Promise<IOrders[]> {
        const rows = await database.query(`SELECT * FROM orders WHERE id = ?`, [id]);
        return rows as IOrders[];
    }
    async delete(id: string): Promise<any[]> {
        const result = await database.query(`DELETE FROM orders WHERE id = ?`, [id]);
        return result;
    }
}
const ordersMigration = new orders();
export const migration = ordersMigration.migration;
export default ordersMigration;
