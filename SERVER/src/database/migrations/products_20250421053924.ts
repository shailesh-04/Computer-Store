import database from "@config/database";
import { IClassProducts, IProducts } from "@interfaces/products";
import Migration from "src/utils/migration";
class Products implements IClassProducts {
    public migration: Migration;
    constructor() {
        this.migration = new Migration("products", {
            id: ["INT", "AUTO_INCREMENT", "PRIMARY KEY"],
            name: ["VARCHAR(255)", "NOT NULL"],
            description: ["TEXT"],
            brand: ["VARCHAR(100)"],
            category_id: ["INT", "NOT NULL"],
            price: ["DECIMAL(10,2)", "NOT NULL"],
            quantity: ["INT", "NOT NULL", "DEFAULT 0"],
            thumbnail: ["VARCHAR(255)"],
            created_at: ["TIMESTAMP", "DEFAULT CURRENT_TIMESTAMP"],
            updated_at: ["TIMESTAMP", "DEFAULT CURRENT_TIMESTAMP", "ON UPDATE CURRENT_TIMESTAMP"],
            FOREIGN_KEY: ["(category_id)", "REFERENCES categories(id)"]
        });
    }

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
}

const productsMigration = new Products();
export const migration = productsMigration.migration;
export default productsMigration;