import database from "@config/database";
import { TypeCartItems } from "@interfaces/cart_items";
class CartItemsModel {
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

    async readByUser(user_id: string): Promise<TypeCartItems[]> {
        const rows = await database.query(
            `SELECT cart_items.*, products.name, products.price, products.thumbnail 
             FROM cart_items 
             JOIN products ON cart_items.product_id = products.id 
             WHERE user_id=?`,
            [user_id]
        );
        return rows as TypeCartItems[];
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

    async clearUserCart(user_id: string): Promise<any[]> {
        const result = await database.query(`DELETE FROM cart_items WHERE user_id=?`, [user_id]);
        return result;
    }
}
export default CartItemsModel;