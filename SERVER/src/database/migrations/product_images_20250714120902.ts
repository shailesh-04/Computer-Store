import database from "@config/database";
import { TypeClassProductImages, TypeProductImages } from "@interfaces/product_images";
import Migration from "@utils/migration";

class ProductImages implements TypeClassProductImages {
    public migration: Migration;
    constructor() {
        this.migration = new Migration("product_images", {
            id: ["INT", "AUTO_INCREMENT", "PRIMARY KEY"],
                demo: ["VARCHAR(100)", "NOT NULL"],
            created_at: ["TIMESTAMP", "DEFAULT CURRENT_TIMESTAMP"],
            updated_at: ["TIMESTAMP", "DEFAULT CURRENT_TIMESTAMP", "ON UPDATE CURRENT_TIMESTAMP"]
        });
    }
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
    public async seeder(): Promise<any[]> {
        const product_images = [
            { demo:"demo" },
           
        ];
        const results = [];
        for (const category of product_images) {
            const result = await this.create(category);
            results.push(result);
        }
        return results;
    }
}
export default ProductImages;
