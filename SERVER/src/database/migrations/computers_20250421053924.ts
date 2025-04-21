import database from "@config/database";
import { IClassComputers, IComputers } from "@interfaces/computers";
import Migration from "src/utils/migration";
class Computers implements IClassComputers {
    public migration: Migration;
    constructor() {
        this.migration = new Migration("computers", {
            id: ["INT", "AUTO_INCREMENT", "PRIMARY KEY"],
            brand: ["VARCHAR(100)", "NOT NULL"],
            model: ["VARCHAR(100)", "NOT NULL"],
            processor: ["VARCHAR(100)"],
            ram: ["VARCHAR(50)"],
            storage: ["VARCHAR(50)"],
            graphics_card: ["VARCHAR(100)"],
            operating_system: ["VARCHAR(50)"],
            screen_size: ["DECIMAL(4,1)"],
            price: ["DECIMAL(10,2)", "NOT NULL"],
            stock_quantity: ["INT", "DEFAULT 0"],
            created_at: ["TIMESTAMP", "DEFAULT CURRENT_TIMESTAMP"],
            updated_at: ["TIMESTAMP", "DEFAULT CURRENT_TIMESTAMP", "ON UPDATE CURRENT_TIMESTAMP"]
        });
    }
    async create(body: IComputers): Promise<any[]> {
        const {
            brand, model, processor, ram, storage,
            graphics_card, operating_system, screen_size,
            price, stock_quantity
        } = body;
        console.log(body)

        const [result] = await database.query(
            `INSERT INTO computers 
            (brand, model, processor, ram, storage, graphics_card, operating_system, screen_size, price, stock_quantity)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [brand, model, processor, ram, storage, graphics_card, operating_system, screen_size, price, stock_quantity]
        );
        return result;
    }

    async update(id: string, body: IComputers): Promise<any[]> {
        const {
            brand, model, processor, ram, storage,
            graphics_card, operating_system, screen_size,
            price, stock_quantity
        } = body;

        const [result] = await database.query(
            `UPDATE computers SET 
            brand = ?, model = ?, processor = ?, ram = ?, storage = ?, 
            graphics_card = ?, operating_system = ?, screen_size = ?, 
            price = ?, stock_quantity = ?
            WHERE id = ?`,
            [brand, model, processor, ram, storage, graphics_card, operating_system, screen_size, price, stock_quantity, id]
        );
        return result;
    }
    async read(): Promise<IComputers[]> {
        const [rows] = await database.query(`SELECT * FROM computers ORDER BY id DESC`);
        return rows as IComputers[];
    }
    async readOne(id: string): Promise<IComputers[]> {
        const [rows] = await database.query(`SELECT * FROM computers WHERE id = ?`, [id]);
        return rows as IComputers[];
    }

    async delete(id: string): Promise<any[]> {
        const [result] = await database.query(`DELETE FROM computers WHERE id = ?`, [id]);
        return result;
    }
}
const computersMigration = new Computers();
export const migration = computersMigration.migration;
export default computersMigration;