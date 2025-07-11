import database from "@config/database";
import { IClassPayments, IPayments } from "@interfaces/payments";
import Migration from "src/utils/migration";
class Payments implements IClassPayments {
    public migration: Migration;
    constructor() {
        this.migration = new Migration("payments", {
            id: ["INT", "AUTO_INCREMENT", "PRIMARY KEY"],
                demo: ["VARCHAR(100)", "NOT NULL"],
            created_at: ["TIMESTAMP", "DEFAULT CURRENT_TIMESTAMP"],
            updated_at: ["TIMESTAMP", "DEFAULT CURRENT_TIMESTAMP", "ON UPDATE CURRENT_TIMESTAMP"]
        });
    }
    async create(body: IPayments): Promise<any[]> {
        const { demo } = body;
        const result = await database.query(`INSERT INTO payments(demo) VALUES (?)`, [demo]);
        return result;
    }
    async update(id: string, body: IPayments): Promise<any[]> {
        const { demo } = body;
        const result = await database.query(`UPDATE payments SET demo = ? WHERE id = ?`, [demo, id]);
        return result;
    }
    async read(): Promise<IPayments[]> {
        const rows = await database.query(`SELECT * FROM payments ORDER BY id DESC`);
        return rows as IPayments[];
    }
    async readOne(id: string): Promise<IPayments[]> {
        const rows = await database.query(`SELECT * FROM payments WHERE id = ?`, [id]);
        return rows as IPayments[];
    }
    async delete(id: string): Promise<any[]> {
        const [result] = await database.query(`DELETE FROM payments WHERE id = ?`, [id]);
        return result;
    }
}
const paymentsMigration = new Payments();
export const migration = paymentsMigration.migration;
export default paymentsMigration;
