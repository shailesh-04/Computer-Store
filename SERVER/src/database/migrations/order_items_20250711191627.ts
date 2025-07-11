import database from "@config/database";
import { IClassOrder_items, IOrder_items } from "@interfaces/order_items";
import Migration from "src/utils/migration";
class Order_items implements IClassOrder_items {
    public migration: Migration;
    constructor() {
        this.migration = new Migration("order_items", {
            id: ["INT", "AUTO_INCREMENT", "PRIMARY KEY"],
                demo: ["VARCHAR(100)", "NOT NULL"],
            created_at: ["TIMESTAMP", "DEFAULT CURRENT_TIMESTAMP"],
            updated_at: ["TIMESTAMP", "DEFAULT CURRENT_TIMESTAMP", "ON UPDATE CURRENT_TIMESTAMP"]
        });
    }
    async create(body: IOrder_items): Promise<any[]> {
        const { demo } = body;
        const result = await database.query(`INSERT INTO order_items(demo) VALUES (?)`, [demo]);
        return result;
    }
    async update(id: string, body: IOrder_items): Promise<any[]> {
        const { demo } = body;
        const result = await database.query(`UPDATE order_items SET demo = ? WHERE id = ?`, [demo, id]);
        return result;
    }
    async read(): Promise<IOrder_items[]> {
        const rows = await database.query(`SELECT * FROM order_items ORDER BY id DESC`);
        return rows as IOrder_items[];
    }
    async readOne(id: string): Promise<IOrder_items[]> {
        const rows = await database.query(`SELECT * FROM order_items WHERE id = ?`, [id]);
        return rows as IOrder_items[];
    }
    async delete(id: string): Promise<any[]> {
        const [result] = await database.query(`DELETE FROM order_items WHERE id = ?`, [id]);
        return result;
    }
}
const order_itemsMigration = new Order_items();
export const migration = order_itemsMigration.migration;
export default order_itemsMigration;
