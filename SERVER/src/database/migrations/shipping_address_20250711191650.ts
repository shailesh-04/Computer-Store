import database from "@config/database";
import { IClassShipping_address, IShipping_address } from "@interfaces/shipping_address";
import Migration from "src/utils/migration";
class Shipping_address implements IClassShipping_address {
    public migration: Migration;
    constructor() {
        this.migration = new Migration("shipping_address", {
            id: ["INT", "AUTO_INCREMENT", "PRIMARY KEY"],
                demo: ["VARCHAR(100)", "NOT NULL"],
            created_at: ["TIMESTAMP", "DEFAULT CURRENT_TIMESTAMP"],
            updated_at: ["TIMESTAMP", "DEFAULT CURRENT_TIMESTAMP", "ON UPDATE CURRENT_TIMESTAMP"]
        });
    }
    async create(body: IShipping_address): Promise<any[]> {
        const { demo } = body;
        const result = await database.query(`INSERT INTO shipping_address(demo) VALUES (?)`, [demo]);
        return result;
    }
    async update(id: string, body: IShipping_address): Promise<any[]> {
        const { demo } = body;
        const result = await database.query(`UPDATE shipping_address SET demo = ? WHERE id = ?`, [demo, id]);
        return result;
    }
    async read(): Promise<IShipping_address[]> {
        const rows = await database.query(`SELECT * FROM shipping_address ORDER BY id DESC`);
        return rows as IShipping_address[];
    }
    async readOne(id: string): Promise<IShipping_address[]> {
        const rows = await database.query(`SELECT * FROM shipping_address WHERE id = ?`, [id]);
        return rows as IShipping_address[];
    }
    async delete(id: string): Promise<any[]> {
        const [result] = await database.query(`DELETE FROM shipping_address WHERE id = ?`, [id]);
        return result;
    }
}
const shipping_addressMigration = new Shipping_address();
export const migration = shipping_addressMigration.migration;
export default shipping_addressMigration;
