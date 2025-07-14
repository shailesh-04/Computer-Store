import database from "@config/database";
import { TypePayments } from "@interfaces/payments";
class PaymentsModel {

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
}
export default PaymentsModel;