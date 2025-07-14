import database from "@config/database";
import { TypeOrderItems } from "@interfaces/order_items";
class OrderItemsModel {
    async create(body: TypeOrderItems): Promise<any[]> {
        const { order_id, product_id, quantity, price } = body;
        const result = await database.query(
            `INSERT INTO order_items(order_id, product_id, quantity, price) VALUES (?,?,?,?)`,
            [order_id, product_id, quantity, price]
        );
        return result;
    }
    async update(id: string, body: TypeOrderItems): Promise<any[]> {
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
    async read(): Promise<TypeOrderItems[]> {
        const rows = await database.query(`SELECT * FROM order_items`);
        return rows as TypeOrderItems[];
    }

    async readByOrder(order_id: string): Promise<TypeOrderItems[]> {
        const rows = await database.query(
            `SELECT order_items.*, products.name, products.thumbnail 
             FROM order_items 
             JOIN products ON order_items.product_id = products.id 
             WHERE order_id=?`,
            [order_id]
        );
        return rows as TypeOrderItems[];
    }

    async readOne(id: string): Promise<TypeOrderItems[]> {
        const rows = await database.query(`SELECT * FROM order_items WHERE id=?`, [id]);
        return rows as TypeOrderItems[];
    }
}
export default OrderItemsModel;