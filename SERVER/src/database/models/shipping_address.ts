import database from "@config/database";
import { TypeShippingAddress } from "@interfaces/shipping_address";
class ShippingAddressModel {

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
}
export default ShippingAddressModel;