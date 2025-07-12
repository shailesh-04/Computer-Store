import database from "@config/database";
import { IClassReviews, IReviews } from "@interfaces/reviews";
import Migration from "src/utils/migration";
class Reviews implements IClassReviews {
    public migration: Migration;
    constructor() {
        this.migration = new Migration("reviews", {
            id: ["INT", "AUTO_INCREMENT", "PRIMARY KEY"],
            user_id: ["INT", "NOT NULL"],
            product_id: ["INT", "NOT NULL"],
            rating: ["TINYINT", "NOT NULL"],
            comment: ["TEXT"],
            created_at: ["TIMESTAMP", "DEFAULT CURRENT_TIMESTAMP"],
            updated_at: ["TIMESTAMP", "DEFAULT CURRENT_TIMESTAMP", "ON UPDATE CURRENT_TIMESTAMP"],
            FOREIGN_KEY: [
                "(user_id)", "REFERENCES users(id)", "ON DELETE CASCADE",
                "(product_id)", "REFERENCES products(id)", "ON DELETE CASCADE"
            ],
            CONSTRAINT: ["CHECK(rating >= 1 AND rating <= 5)"]
        });
    }

    async create(body: IReviews): Promise<any[]> {
        const { user_id, product_id, rating, comment } = body;
        const result = await database.query(
            `INSERT INTO reviews(user_id, product_id, rating, comment) VALUES (?,?,?,?)`, 
            [user_id, product_id, rating, comment]
        );
        return result;
    }

    async update(id: string, body: IReviews): Promise<any[]> {
        const { user_id, product_id, rating, comment } = body;
        const result = await database.query(
            `UPDATE reviews SET user_id=?, product_id=?, rating=?, comment=? WHERE id=?`, 
            [user_id, product_id, rating, comment, id]
        );
        return result;
    }

    async read(): Promise<IReviews[]> {
        const rows = await database.query(`SELECT * FROM reviews ORDER BY id DESC`);
        return rows as IReviews[];
    }

    // Uncomment the following method if you want to read reviews by product
    // async readByProduct(product_id: string): Promise<IReviews[]> {
    //     const rows = await database.query(
    //         `SELECT reviews.*, users.name as user_name, users.image as user_image 
    //          FROM reviews 
    //          JOIN users ON reviews.user_id = users.id 
    //          WHERE product_id=? 
    //          ORDER BY id DESC`, 
    //         [product_id]
    //     );
    //     return rows as IReviews[];
    // }

    async readOne(id: string): Promise<IReviews[]> {
        const rows = await database.query(`SELECT * FROM reviews WHERE id=?`, [id]);
        return rows as IReviews[];
    }

    async delete(id: string): Promise<any[]> {
        const result = await database.query(`DELETE FROM reviews WHERE id=?`, [id]);
        return result;
    }
}

const reviewsMigration = new Reviews();
export const migration = reviewsMigration.migration;
export default reviewsMigration;
