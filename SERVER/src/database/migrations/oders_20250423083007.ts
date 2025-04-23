import database from "@config/database";
import { IClassOders, IOders } from "@interfaces/oders";
import Migration from "src/utils/migration";
class Oders implements IClassOders {
    public migration: Migration;
    constructor() {
        this.migration = new Migration("oders", {
            id: ["INT", "AUTO_INCREMENT", "PRIMARY KEY"],
                demo: ["VARCHAR(100)", "NOT NULL"],
            created_at: ["TIMESTAMP", "DEFAULT CURRENT_TIMESTAMP"],
            updated_at: ["TIMESTAMP", "DEFAULT CURRENT_TIMESTAMP", "ON UPDATE CURRENT_TIMESTAMP"]
        });
    }
    async create(body: IOders): Promise<any[]> {
        const { demo } = body;
        const [result] = await database.query(`INSERT INTO oders(demo) VALUES (?)`, [demo]);
        return result;
    }
    async update(id: string, body: IOders): Promise<any[]> {
        const { demo } = body;
        const [result] = await database.query(`UPDATE oders SET demo = ? WHERE id = ?`, [demo, id]);
        return result;
    }
    async read(): Promise<IOders[]> {
        const [rows] = await database.query(`SELECT * FROM oders ORDER BY id DESC`);
        return rows as IOders[];
    }
    async readOne(id: string): Promise<IOders[]> {
        const [rows] = await database.query(`SELECT * FROM oders WHERE id = ?`, [id]);
        return rows as IOders[];
    }
    async delete(id: string): Promise<any[]> {
        const [result] = await database.query(`DELETE FROM oders WHERE id = ?`, [id]);
        return result;
    }
}
const odersMigration = new Oders();
export const migration = odersMigration.migration;
export default odersMigration;
