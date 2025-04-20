import mysql from "mysql2/promise"
import env from "./env"
class Database{
    private pool:mysql.Pool;
    constructor(){
        this.pool = mysql.createPool({
            host:env.DB_HOST,
            port:env.DB_PORT,
            user:env.DB_USER,
            password:env.DB_PASSWORD,
            database:env.DB_NAME,
            waitForConnections:true,
        });
    }
    public async testConnection():Promise<void>{
        try {
            const conn = await this.pool.getConnection();
            await conn.ping();
            conn.release();
            console.log("Sucessfuly Connect Database!")
        } catch (error) {
            console.log("Database Connection Error");
            throw error;
        }
    }
    public async query(sql:string,parmam?:any[]):Promise<any> {
        const conn = await this.pool.getConnection();
        try {
            const [result] = await conn.query(sql,parmam);
            return result;
        } finally{
            conn.release();
        } 
    }
    public async close():Promise<void>{
        await this.pool.end();
    }
}
export default new Database();