import database from "@config/database";
import { TypeClassPayments, TypePayments } from "@interfaces/payments";
import Migration from "@utils/migration";

class Payments implements TypeClassPayments {
    public migration: Migration;
    constructor() {
        this.migration = new Migration("payments", {
            id: ["INT", "AUTO_INCREMENT", "PRIMARY KEY"],
                demo: ["VARCHAR(100)", "NOT NULL"],
            created_at: ["TIMESTAMP", "DEFAULT CURRENT_TIMESTAMP"],
            updated_at: ["TIMESTAMP", "DEFAULT CURRENT_TIMESTAMP", "ON UPDATE CURRENT_TIMESTAMP"]
        });
    }
    async create(body: TypePayments): Promise<any[]> {
        const { demo } = body;
        const result = await database.query(`INSERT INTO payments(demo) VALUES (?)`, [demo]);
        return result;
    }
    async update(id: string, body: TypePayments): Promise<any[]> {
        const { demo } = body;
        const result = await database.query(`UPDATE payments SET demo = ? WHERE id = ?`, [demo, id]);
        return result;
    }
    async read(): Promise<TypePayments[]> {
        const rows = await database.query(`SELECT * FROM payments ORDER BY id DESC`);
        return rows as TypePayments[];
    }
    async readOne(id: string): Promise<TypePayments[]> {
        const rows = await database.query(`SELECT * FROM payments WHERE id = ?`, [id]);
        return rows as TypePayments[];
    }
    async delete(id: string): Promise<any[]> {
        const [result] = await database.query(`DELETE FROM payments WHERE id = ?`, [id]);
        return result;
    }
    public async seeder(): Promise<any[]> {
        const payments = [
            { demo:"demo" },
           
        ];
        const results = [];
        for (const category of payments) {
            const result = await this.create(category);
            results.push(result);
        }
        return results;
    }
}
export default Payments;
