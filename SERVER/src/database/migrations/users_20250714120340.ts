import database from "@config/database";
import { TypeClassUsers, TypeUsers } from "@interfaces/users";
import Migration from "@utils/migration";

class Users implements TypeClassUsers {
    public migration: Migration;
    constructor() {
        this.migration = new Migration("users", {
            id: ["INT", "AUTO_INCREMENT", "PRIMARY KEY"],
                demo: ["VARCHAR(100)", "NOT NULL"],
            created_at: ["TIMESTAMP", "DEFAULT CURRENT_TIMESTAMP"],
            updated_at: ["TIMESTAMP", "DEFAULT CURRENT_TIMESTAMP", "ON UPDATE CURRENT_TIMESTAMP"]
        });
    }
    async create(body: TypeUsers): Promise<any[]> {
        const { demo } = body;
        const result = await database.query(`INSERT INTO users(demo) VALUES (?)`, [demo]);
        return result;
    }
    async update(id: string, body: TypeUsers): Promise<any[]> {
        const { demo } = body;
        const result = await database.query(`UPDATE users SET demo = ? WHERE id = ?`, [demo, id]);
        return result;
    }
    async read(): Promise<TypeUsers[]> {
        const rows = await database.query(`SELECT * FROM users ORDER BY id DESC`);
        return rows as TypeUsers[];
    }
    async readOne(id: string): Promise<TypeUsers[]> {
        const rows = await database.query(`SELECT * FROM users WHERE id = ?`, [id]);
        return rows as TypeUsers[];
    }
    async delete(id: string): Promise<any[]> {
        const [result] = await database.query(`DELETE FROM users WHERE id = ?`, [id]);
        return result;
    }
    public async seeder(): Promise<any[]> {
        const users = [
            { demo:"demo" },
           
        ];
        const results = [];
        for (const category of users) {
            const result = await this.create(category);
            results.push(result);
        }
        return results;
    }
}
export default Users;
