import database from "@config/database";
import { TypeClassCartItems, TypeCartItems } from "@interfaces/cart_items";
import Migration from "src/utils/migration";

class CartItems implements TypeClassCartItems {
    public migration: Migration;
    constructor() {
        this.migration = new Migration("cart_items", {
            id: ["INT", "AUTO_INCREMENT", "PRIMARY KEY"],
            user_id: ["INT", "NOT NULL"],
            product_id: ["INT", "NOT NULL"],
            quantity: ["INT", "NOT NULL", "DEFAULT 1"],
            created_at: ["TIMESTAMP", "DEFAULT CURRENT_TIMESTAMP"],
            updated_at: ["TIMESTAMP", "DEFAULT CURRENT_TIMESTAMP", "ON UPDATE CURRENT_TIMESTAMP"],

        }, [
            "FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE",
            "FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE"
        ]);
    }
    async create(body: TypeCartItems): Promise<any[]> {
        const { user_id, product_id, quantity } = body;
        const result = await database.query(
            `INSERT INTO cart_items(user_id, product_id, quantity) VALUES (?,?,?)`,
            [user_id, product_id, quantity]
        );
        return result;
    }

    async update(id: string, body: TypeCartItems): Promise<any[]> {
        const { user_id, product_id, quantity } = body;
        const result = await database.query(
            `UPDATE cart_items SET user_id=?, product_id=?, quantity=? WHERE id=?`,
            [user_id, product_id, quantity, id]
        );
        return result;
    }

    async read(): Promise<TypeCartItems[]> {
        const rows = await database.query(`SELECT * FROM cart_items`);
        return rows as TypeCartItems[];
    }
    async readOne(id: string): Promise<TypeCartItems[]> {
        const rows = await database.query(`SELECT * FROM cart_items WHERE id=?`, [id]);
        return rows as TypeCartItems[];
    }

    async delete(id: string): Promise<any[]> {
        const result = await database.query(`DELETE FROM cart_items WHERE id=?`, [id]);
        return result;
    }
}


export default new CartItems();
