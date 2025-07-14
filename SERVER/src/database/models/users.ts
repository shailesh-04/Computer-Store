import database from "@config/database";
import { TypeUsers } from "@interfaces/users";
class UsersModel {

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
}
export default UsersModel;