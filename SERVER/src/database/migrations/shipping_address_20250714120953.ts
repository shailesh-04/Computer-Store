import database from "@config/database";
import { TypeClassShippingAddress, TypeShippingAddress } from "@interfaces/shipping_address";
import Migration from "@utils/migration";

class ShippingAddress implements TypeClassShippingAddress {
    public migration: Migration;
    constructor() {
        this.migration = new Migration("shipping_address", {
            id: ["INT", "AUTO_INCREMENT", "PRIMARY KEY"],
                demo: ["VARCHAR(100)", "NOT NULL"],
            created_at: ["TIMESTAMP", "DEFAULT CURRENT_TIMESTAMP"],
            updated_at: ["TIMESTAMP", "DEFAULT CURRENT_TIMESTAMP", "ON UPDATE CURRENT_TIMESTAMP"]
        });
    }
    async create(body: TypeShippingAddress): Promise<any[]> {
        const { demo } = body;
        const result = await database.query(`INSERT INTO shipping_address(demo) VALUES (?)`, [demo]);
        return result;
    }
    async update(id: string, body: TypeShippingAddress): Promise<any[]> {
        const { demo } = body;
        const result = await database.query(`UPDATE shipping_address SET demo = ? WHERE id = ?`, [demo, id]);
        return result;
    }
    async read(): Promise<TypeShippingAddress[]> {
        const rows = await database.query(`SELECT * FROM shipping_address ORDER BY id DESC`);
        return rows as TypeShippingAddress[];
    }
    async readOne(id: string): Promise<TypeShippingAddress[]> {
        const rows = await database.query(`SELECT * FROM shipping_address WHERE id = ?`, [id]);
        return rows as TypeShippingAddress[];
    }
    async delete(id: string): Promise<any[]> {
        const [result] = await database.query(`DELETE FROM shipping_address WHERE id = ?`, [id]);
        return result;
    }
    public async seeder(): Promise<any[]> {
        const shipping_address = [
            { demo:"demo" },
           
        ];
        const results = [];
        for (const category of shipping_address) {
            const result = await this.create(category);
            results.push(result);
        }
        return results;
    }
}
export default ShippingAddress;
