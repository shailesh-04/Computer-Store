import database from "@config/database";
import { IClassOrder_items, IOrder_items } from "@interfaces/order_items";
import Migration from "src/utils/migration";
class Order_items implements IClassOrder_items {
    public migration: Migration;
    constructor() {
        this.migration = new Migration("order_items", {
            id: ["INT", "AUTO_INCREMENT", "PRIMARY KEY"],
            order_id: ["INT", "NOT NULL"],
            product_id: ["INT", "NOT NULL"],
            quantity: ["INT", "NOT NULL"],
            price: ["DECIMAL(10,2)", "NOT NULL"],
            created_at: ["TIMESTAMP", "DEFAULT CURRENT_TIMESTAMP"],
            FOREIGN_KEY: [
                "(order_id)", "REFERENCES orders(id)", "ON DELETE CASCADE",
                "(product_id)", "REFERENCES products(id)"
            ]
        });
    }

    async create(body: IOrder_items): Promise<any[]> {
        const { order_id, product_id, quantity, price } = body;
        const result = await database.query(
            `INSERT INTO order_items(order_id, product_id, quantity, price) VALUES (?,?,?,?)`, 
            [order_id, product_id, quantity, price]
        );
        return result;
    }
    async update(id: string, body: IOrder_items): Promise<any[]> {
        const { order_id, product_id, quantity, price } = body;
        const result = await database.query(
            `UPDATE order_items SET order_id=?, product_id=?, quantity=?, price=? WHERE id=?`, 
            [order_id, product_id, quantity, price, id]
        );
        return result;
    }
    async delete(id: string): Promise<any[]> {
        const result = await database.query(`DELETE FROM order_items WHERE id=?`, [id]);
        return result;
    } 
    async read(): Promise<IOrder_items[]> {
        const rows = await database.query(`SELECT * FROM order_items`);
        return rows as IOrder_items[];
    }  

    // async readByOrder(order_id: string): Promise<IOrder_items[]> {
    //     const rows = await database.query(
    //         `SELECT order_items.*, products.name, products.thumbnail 
    //          FROM order_items 
    //          JOIN products ON order_items.product_id = products.id 
    //          WHERE order_id=?`, 
    //         [order_id]
    //     );
    //     return rows as IOrder_items[];
    // }

    async readOne(id: string): Promise<IOrder_items[]> {
        const rows = await database.query(`SELECT * FROM order_items WHERE id=?`, [id]);
        return rows as IOrder_items[];
    }
}

const order_itemsMigration = new Order_items();
export const migration = order_itemsMigration.migration;
export default order_itemsMigration;
