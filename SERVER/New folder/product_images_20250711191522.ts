import database from "@config/database";
import { IClassProduct_images, IProduct_images } from "@interfaces/product_images";
import Migration from "src/utils/migration";
class Product_images implements IClassProduct_images {
    public migration: Migration;
    constructor() {
        this.migration = new Migration("product_images", {
            id: ["INT", "AUTO_INCREMENT", "PRIMARY KEY"],
            product_id: ["INT", "NOT NULL"],
            url: ["VARCHAR(255)", "NOT NULL"],
            alt_text: ["VARCHAR(255)"],
            created_at: ["TIMESTAMP", "DEFAULT CURRENT_TIMESTAMP"],
            updated_at: ["TIMESTAMP", "DEFAULT CURRENT_TIMESTAMP", "ON UPDATE CURRENT_TIMESTAMP"],
            FOREIGN_KEY: ["(product_id)", "REFERENCES products(id)", "ON DELETE CASCADE"]
        });
    }

    async create(body: IProduct_images): Promise<any[]> {
        const { product_id, url, alt_text } = body;
        const result = await database.query(
            `INSERT INTO product_images(product_id, url, alt_text) VALUES (?,?,?)`, 
            [product_id, url, alt_text]
        );
        return result;
    }

    async update(id: string, body: IProduct_images): Promise<any[]> {
        const { product_id, url, alt_text } = body;
        const result = await database.query(
            `UPDATE product_images SET product_id=?, url=?, alt_text=? WHERE id=?`, 
            [product_id, url, alt_text, id]
        );
        return result;
    }

    async read(): Promise<IProduct_images[]> {
        const rows = await database.query(`SELECT * FROM product_images ORDER BY id DESC`);
        return rows as IProduct_images[];
    }

    async readByProduct(product_id: string): Promise<IProduct_images[]> {
        const rows = await database.query(`SELECT * FROM product_images WHERE product_id=?`, [product_id]);
        return rows as IProduct_images[];
    }

    async readOne(id: string): Promise<IProduct_images[]> {
        const rows = await database.query(`SELECT * FROM product_images WHERE id=?`, [id]);
        return rows as IProduct_images[];
    }

    async delete(id: string): Promise<any[]> {
        const result = await database.query(`DELETE FROM product_images WHERE id=?`, [id]);
        return result;
    }
}

const product_imagesMigration = new Product_images();
export const migration = product_imagesMigration.migration;
export default product_imagesMigration;
