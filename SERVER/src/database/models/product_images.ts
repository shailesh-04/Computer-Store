import database from "@config/database";
import { TypeProductImages } from "@interfaces/product_images";
class ProductImagesModel {

    async create(body: TypeProductImages): Promise<any[]> {
        const { demo } = body;
        const result = await database.query(`INSERT INTO product_images(demo) VALUES (?)`, [demo]);
        return result;
    }
    async update(id: string, body: TypeProductImages): Promise<any[]> {
        const { demo } = body;
        const result = await database.query(`UPDATE product_images SET demo = ? WHERE id = ?`, [demo, id]);
        return result;
    }
    async read(): Promise<TypeProductImages[]> {
        const rows = await database.query(`SELECT * FROM product_images ORDER BY id DESC`);
        return rows as TypeProductImages[];
    }
    async readOne(id: string): Promise<TypeProductImages[]> {
        const rows = await database.query(`SELECT * FROM product_images WHERE id = ?`, [id]);
        return rows as TypeProductImages[];
    }
    async delete(id: string): Promise<any[]> {
        const [result] = await database.query(`DELETE FROM product_images WHERE id = ?`, [id]);
        return result;
    }
}
export default ProductImagesModel;