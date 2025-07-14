import database from "@config/database";
import { TypeCategories } from "@interfaces/categories";
class CategoriesModel {
    public async create(body: TypeCategories): Promise<any[]> {
        const { name, slug } = body;
        const result = await database.query(
            `INSERT INTO categories(name, slug) VALUES (?,?)`,
            [name, slug]
        );
        return result;
    }
    public async update(id: string, body: TypeCategories): Promise<any[]> {
        const { name, slug } = body;
        const result = await database.query(
            `UPDATE categories SET name=?, slug=? WHERE id=?`,
            [name, slug, id]
        );
        return result;
    }
    public async read(): Promise<TypeCategories[]> {
        const rows = await database.query(`SELECT * FROM categories ORDER BY id DESC`);
        return rows as TypeCategories[];
    }
    public async readOne(id: string): Promise<TypeCategories[]> {
        const rows = await database.query(`SELECT * FROM categories WHERE id=?`, [id]);
        return rows as TypeCategories[];
    }
    public async delete(id: string): Promise<any[]> {
        const result = await database.query(`DELETE FROM categories WHERE id=?`, [id]);
        return result;
    }
    public async exists(id: string): Promise<boolean> {
        const rows = await database.query(`SELECT COUNT(*) as count FROM categories WHERE id=?`, [id]);
        return (rows[0].count > 0);
    }
}
export default CategoriesModel;