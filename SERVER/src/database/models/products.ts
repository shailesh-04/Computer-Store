import database from "@config/database";
import { IProducts } from "@interfaces/products";
class ProductsModel {
    async create(body: IProducts): Promise<any[]> {
        const { name, description, brand, category_id, price, quantity, thumbnail } = body;
        const result = await database.query(
            `INSERT INTO products(name, description, brand, category_id, price, quantity, thumbnail) VALUES (?,?,?,?,?,?,?)`,
            [name, description, brand, category_id, price, quantity, thumbnail]
        );
        return result;
    }

     async update(id: string, body: IProducts): Promise<any[]> {
        const { name, description, brand, category_id, price, quantity, thumbnail } = body;
        const result = await database.query(
            `UPDATE products SET name=?, description=?, brand=?, category_id=?, price=?, quantity=?, thumbnail=? WHERE id=?`,
            [name, description, brand, category_id, price, quantity, thumbnail, id]
        );
        return result;
    }
    async read(): Promise<IProducts[]> {
        const rows = await database.query(`SELECT * FROM products ORDER BY id DESC`);
        return rows as IProducts[];
    }
    async readOne(id: string): Promise<IProducts[]> {
        const rows = await database.query(`SELECT * FROM products WHERE id=?`, [id]);
        return rows as IProducts[];
    }
    async delete(id: string): Promise<any[]> {
        const result = await database.query(`DELETE FROM products WHERE id=?`, [id]);
        return result;
    }
    async exists(id: string): Promise<boolean> {
        const rows = await database.query(`SELECT COUNT(*) as count FROM products WHERE id=?`, [id]);
        return rows[0].count > 0;
    }
    async search(query: string): Promise<IProducts[]> {
        const rows = await database.query(
            `SELECT * FROM products WHERE name LIKE ? OR description LIKE ? OR brand LIKE ? ORDER BY id DESC`,
            [`%${query}%`, `%${query}%`, `%${query}%`]
        );
        return rows as IProducts[];
    }
}
export default ProductsModel;