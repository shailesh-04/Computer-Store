import database from "@config/database";
import { IClassCategories, ICategories } from "@interfaces/categories";
import Migration from "src/utils/migration";
class Categories implements IClassCategories {
    public migration: Migration;
    constructor() {
        this.migration = new Migration("categories", {
            id: ["INT", "AUTO_INCREMENT", "PRIMARY KEY"],
            name: ["VARCHAR(100)", "NOT NULL"],
            slug: ["VARCHAR(100)", "NOT NULL", "UNIQUE"],
            created_at: ["TIMESTAMP", "DEFAULT CURRENT_TIMESTAMP"],
            updated_at: ["TIMESTAMP", "DEFAULT CURRENT_TIMESTAMP", "ON UPDATE CURRENT_TIMESTAMP"]
        });
    }

    public async create(body: ICategories): Promise<any[]> {
        const { name, slug } = body;
        const result = await database.query(
            `INSERT INTO categories(name, slug) VALUES (?,?)`, 
            [name, slug]
        );
        return result;
    }

    public async update(id: string, body: ICategories): Promise<any[]> {
        const { name, slug } = body;
        const result = await database.query(
            `UPDATE categories SET name=?, slug=? WHERE id=?`, 
            [name, slug, id]
        );
        return result;
    }
    public async read(): Promise<ICategories[]> {
        const rows = await database.query(`SELECT * FROM categories ORDER BY id DESC`);
        return rows as ICategories[];
    }

    public async readOne(id: string): Promise<ICategories[]> {
        const rows = await database.query(`SELECT * FROM categories WHERE id=?`, [id]);
        return rows as ICategories[];
    }

    public async delete(id: string): Promise<any[]> {
        const result = await database.query(`DELETE FROM categories WHERE id=?`, [id]);
        return result;
    }
    public async seeder(): Promise<any[]> {
        const categories = [
            { name: "Laptops", slug: "laptops" },
            { name: "Desktops", slug: "desktops" },
            { name: "Monitors", slug: "monitors" },
            { name: "Accessories", slug: "accessories" },
            { name: "Printers", slug: "printers" },
            { name: "Networking", slug: "networking" },
            { name: "Storage", slug: "storage" },
            { name: "Software", slug: "software" },
            { name: "Components", slug: "components" },
            { name: "Gaming", slug: "gaming" }
        ];
        const results = [];
        for (const category of categories) {
            const result = await this.create(category);
            results.push(result);
        }
        return results;
    }
}
export default new Categories();
