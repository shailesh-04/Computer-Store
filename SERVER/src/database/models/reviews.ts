import database from "@config/database";
import { TypeReviews } from "@interfaces/reviews";
class ReviewsModel {

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
}
export default ReviewsModel;