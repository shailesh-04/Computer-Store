import database from "@config/database";
import { IClassCart_items, ICart_items } from "@interfaces/cart_items";
import Migration from "src/utils/migration";

class Cart_items implements IClassCart_items {
    public migration: Migration;
    constructor() {
        this.migration = new Migration("cart_items", {
            id: ["INT", "AUTO_INCREMENT", "PRIMARY KEY"],
            user_id: ["INT", "NOT NULL"],
            product_id: ["INT", "NOT NULL"],
            quantity: ["INT", "NOT NULL", "DEFAULT 1"],
            created_at: ["TIMESTAMP", "DEFAULT CURRENT_TIMESTAMP"],
            updated_at: ["TIMESTAMP", "DEFAULT CURRENT_TIMESTAMP", "ON UPDATE CURRENT_TIMESTAMP"],
            FOREIGN_KEY: [
                "(user_id)", "REFERENCES users(id)", "ON DELETE CASCADE",
                "(product_id)", "REFERENCES products(id)", "ON DELETE CASCADE"
            ]
        });
    }

    async create(body: ICart_items): Promise<any[]> {
        const { user_id, product_id, quantity } = body;
        const result = await database.query(
            `INSERT INTO cart_items(user_id, product_id, quantity) VALUES (?,?,?)`, 
            [user_id, product_id, quantity]
        );
        return result;
    }

    async update(id: string, body: ICart_items): Promise<any[]> {
        const { user_id, product_id, quantity } = body;
        const result = await database.query(
            `UPDATE cart_items SET user_id=?, product_id=?, quantity=? WHERE id=?`, 
            [user_id, product_id, quantity, id]
        );
        return result;
    }

    // async readByUser(user_id: string): Promise<ICart_items[]> {
    //     const rows = await database.query(
    //         `SELECT cart_items.*, products.name, products.price, products.thumbnail 
    //          FROM cart_items 
    //          JOIN products ON cart_items.product_id = products.id 
    //          WHERE user_id=?`, 
    //         [user_id]
    //     );
    //     return rows as ICart_items[];
    // }
    async read(): Promise<ICart_items[]> {
        const rows = await database.query(`SELECT * FROM cart_items`);
        return rows as ICart_items[];
    }
    async readOne(id: string): Promise<ICart_items[]> {
        const rows = await database.query(`SELECT * FROM cart_items WHERE id=?`, [id]);
        return rows as ICart_items[];
    }

    async delete(id: string): Promise<any[]> {
        const result = await database.query(`DELETE FROM cart_items WHERE id=?`, [id]);
        return result;
    }

    // async clearUserCart(user_id: string): Promise<any[]> {
    //     const result = await database.query(`DELETE FROM cart_items WHERE user_id=?`, [user_id]);
    //     return result;
    // }
}

const cart_itemsMigration = new Cart_items();
export const migration = cart_itemsMigration.migration;
export default cart_itemsMigration;
