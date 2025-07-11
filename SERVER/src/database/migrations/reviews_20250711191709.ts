import database from "@config/database";
import { IClassReviews, IReviews } from "@interfaces/reviews";
import Migration from "src/utils/migration";
class Reviews implements IClassReviews {
    public migration: Migration;
    constructor() {
        this.migration = new Migration("reviews", {
            id: ["INT", "AUTO_INCREMENT", "PRIMARY KEY"],
                demo: ["VARCHAR(100)", "NOT NULL"],
            created_at: ["TIMESTAMP", "DEFAULT CURRENT_TIMESTAMP"],
            updated_at: ["TIMESTAMP", "DEFAULT CURRENT_TIMESTAMP", "ON UPDATE CURRENT_TIMESTAMP"]
        });
    }
    async create(body: IReviews): Promise<any[]> {
        const { demo } = body;
        const result = await database.query(`INSERT INTO reviews(demo) VALUES (?)`, [demo]);
        return result;
    }
    async update(id: string, body: IReviews): Promise<any[]> {
        const { demo } = body;
        const result = await database.query(`UPDATE reviews SET demo = ? WHERE id = ?`, [demo, id]);
        return result;
    }
    async read(): Promise<IReviews[]> {
        const rows = await database.query(`SELECT * FROM reviews ORDER BY id DESC`);
        return rows as IReviews[];
    }
    async readOne(id: string): Promise<IReviews[]> {
        const rows = await database.query(`SELECT * FROM reviews WHERE id = ?`, [id]);
        return rows as IReviews[];
    }
    async delete(id: string): Promise<any[]> {
        const [result] = await database.query(`DELETE FROM reviews WHERE id = ?`, [id]);
        return result;
    }
}
const reviewsMigration = new Reviews();
export const migration = reviewsMigration.migration;
export default reviewsMigration;
