import database from "@config/database";
import { TypeClassReviews, TypeReviews } from "@interfaces/reviews";
import Migration from "@utils/migration";

class Reviews implements TypeClassReviews {
    public migration: Migration;
    constructor() {
        this.migration = new Migration("reviews", {
            id: ["INT", "AUTO_INCREMENT", "PRIMARY KEY"],
                demo: ["VARCHAR(100)", "NOT NULL"],
            created_at: ["TIMESTAMP", "DEFAULT CURRENT_TIMESTAMP"],
            updated_at: ["TIMESTAMP", "DEFAULT CURRENT_TIMESTAMP", "ON UPDATE CURRENT_TIMESTAMP"]
        });
    }
    async create(body: TypeReviews): Promise<any[]> {
        const { demo } = body;
        const result = await database.query(`INSERT INTO reviews(demo) VALUES (?)`, [demo]);
        return result;
    }
    async update(id: string, body: TypeReviews): Promise<any[]> {
        const { demo } = body;
        const result = await database.query(`UPDATE reviews SET demo = ? WHERE id = ?`, [demo, id]);
        return result;
    }
    async read(): Promise<TypeReviews[]> {
        const rows = await database.query(`SELECT * FROM reviews ORDER BY id DESC`);
        return rows as TypeReviews[];
    }
    async readOne(id: string): Promise<TypeReviews[]> {
        const rows = await database.query(`SELECT * FROM reviews WHERE id = ?`, [id]);
        return rows as TypeReviews[];
    }
    async delete(id: string): Promise<any[]> {
        const [result] = await database.query(`DELETE FROM reviews WHERE id = ?`, [id]);
        return result;
    }
    public async seeder(): Promise<any[]> {
        const reviews = [
            { demo:"demo" },
           
        ];
        const results = [];
        for (const category of reviews) {
            const result = await this.create(category);
            results.push(result);
        }
        return results;
    }
}
export default Reviews;
