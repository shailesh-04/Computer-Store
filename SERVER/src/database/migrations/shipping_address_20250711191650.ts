import database from "@config/database";
import { IClassShipping_address, IShipping_address } from "@interfaces/shipping_address";
import Migration from "src/utils/migration";
class Shipping_address implements IClassShipping_address   {
    public migration: Migration;
    constructor() {
        this.migration = new Migration("shipping_address", {
            id: ["INT", "AUTO_INCREMENT", "PRIMARY KEY"],
            user_id: ["INT", "NOT NULL"],
            order_id: ["INT", "NOT NULL", "UNIQUE"],
            full_name: ["VARCHAR(100)", "NOT NULL"],
            address: ["TEXT", "NOT NULL"],
            city: ["VARCHAR(100)", "NOT NULL"],
            state: ["VARCHAR(100)", "NOT NULL"],
            zip_code: ["VARCHAR(20)", "NOT NULL"],
            country: ["VARCHAR(100)", "NOT NULL"],
            created_at: ["TIMESTAMP", "DEFAULT CURRENT_TIMESTAMP"],
            updated_at: ["TIMESTAMP", "DEFAULT CURRENT_TIMESTAMP", "ON UPDATE CURRENT_TIMESTAMP"],
            FOREIGN_KEY: [
                "(user_id)", "REFERENCES users(id)",
                "(order_id)", "REFERENCES orders(id)", "ON DELETE CASCADE"
            ]
        });
    }

    async create(body: IShipping_address): Promise<any[]> {
        const { user_id, order_id, full_name, address, city, state, zip_code, country } = body;
        const result = await database.query(
            `INSERT INTO shipping_address(user_id, order_id, full_name, address, city, state, zip_code, country) 
             VALUES (?,?,?,?,?,?,?,?)`, 
            [user_id, order_id, full_name, address, city, state, zip_code, country]
        );
        return result;
    }


    async update(id: string, body: IShipping_address): Promise<any[]> {
        const { user_id, order_id, full_name, address, city, state, zip_code, country } = body;
        const result = await database.query(
            `UPDATE shipping_address SET user_id=?, order_id=?, full_name=?, address=?, city=?, state=?, zip_code=?, country=? WHERE id=?`, 
            [user_id, order_id, full_name, address, city, state, zip_code, country, id]
        );
        return result;
    }
    // async readByOrder(order_id: string): Promise<IShipping_address[]> {
    //     const rows = await database.query(`SELECT * FROM shipping_address WHERE order_id=?`, [order_id]);
    //     return rows as IShipping_address[];
    // }
    async delete(id: string): Promise<any[]> {
        const result = await database.query(`DELETE FROM shipping_address WHERE id=?`, [id]);
        return result;
    }
    async read(): Promise<IShipping_address[]> {
        const rows = await database.query(`SELECT * FROM shipping_address`);
        return rows as IShipping_address[];
    }
    // async readAll(): Promise<IShipping_address[]> {
    //     const rows = await database.query(`SELECT * FROM shipping_address`);
    //     return rows as IShipping_address[];
    // }

    async readOne(id: string): Promise<IShipping_address[]> {
        const rows = await database.query(`SELECT * FROM shipping_address WHERE id=?`, [id]);
        return rows as IShipping_address[];
    }
}

const shipping_addressMigration = new Shipping_address();
export const migration = shipping_addressMigration.migration;
export default shipping_addressMigration;
