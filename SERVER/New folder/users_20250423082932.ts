import database from "@config/database";
import { IClassUsers, IUsers } from "@interfaces/users";
import Migration from "src/utils/migration";
class Users implements IClassUsers {
    public migration: Migration;
    constructor() {
        this.migration = new Migration("users", {
            id: ["INT", "AUTO_INCREMENT", "PRIMARY KEY"],
            name: ["VARCHAR(100)", "NOT NULL"],
            email: ["VARCHAR(100)", "NOT NULL", "UNIQUE"],
            password: ["VARCHAR(255)", "NOT NULL"],
            role: ["ENUM('customer', 'admin')", "NOT NULL", "DEFAULT 'customer'"],
            image: ["VARCHAR(255)"],
            created_at: ["TIMESTAMP", "DEFAULT CURRENT_TIMESTAMP"],
            updated_at: ["TIMESTAMP", "DEFAULT CURRENT_TIMESTAMP", "ON UPDATE CURRENT_TIMESTAMP"]
        });
    }

    async create(body: IUsers): Promise<any[]> {
        const { name, email, password, role, image } = body;
        const result = await database.query(
            `INSERT INTO users(name, email, password, role, image) VALUES (?,?,?,?,?)`, 
            [name, email, password, role, image]
        );
        return result;
    }

    async update(id: string, body: IUsers): Promise<any[]> {
        const { name, email, password, role, image } = body;
        const result = await database.query(
            `UPDATE users SET name=?, email=?, password=?, role=?, image=? WHERE id=?`, 
            [name, email, password, role, image, id]
        );
        return result;
    }

    async read(): Promise<IUsers[]> {
        const rows = await database.query(`SELECT * FROM users ORDER BY id DESC`);
        return rows as IUsers[];
    }

    async readOne(id: string): Promise<IUsers[]> {
        const rows = await database.query(`SELECT * FROM users WHERE id=?`, [id]);
        return rows as IUsers[];
    }

    async delete(id: string): Promise<any[]> {
        const result = await database.query(`DELETE FROM users WHERE id=?`, [id]);
        return result;
    }
}


export default new Users();
