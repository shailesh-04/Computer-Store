import database from "@config/database";

type FieldDefinitions = {
    [fieldName: string]: string[];
};
class Migration {
    private table: string;
    private fields: { fieldName: string; type: string[] }[];
    constructor(table: string, fieldDefinitions: FieldDefinitions) {
        database.testConnection();
        this.table = table;
        this.fields = Object.entries(fieldDefinitions).map(([fieldName, type]) => ({
            fieldName,
            type
        }));
    } 
    public async createTable(): Promise<void> {
        const fieldDefs = this.fields
            .map(field => `${field.fieldName} ${field.type.join(' ')}`)
            .join(',\n  ');

        try {
            await database.query(`CREATE TABLE ${this.table} (\n  ${fieldDefs}\n);`);
            console.log("Successfully created table", this.table);
        } catch (error: any) {
            console.error("Failed to create table!");
            console.log(error.sqlMessage || error.message);
            throw error;
        }
    }
    public async dropTable(): Promise<void> {
        try {
            await database.query(`DROP TABLE IF EXISTS ${this.table}`);
            console.log("Successfully dropped table", this.table);
        } catch (error: any) {
            console.error("Failed to drop table!");
            console.log(error.sqlMessage || error.message);
            throw error;
        }
    }
    public async truncateTable(): Promise<void> {
        try {
            await database.query(`TRUNCATE TABLE ${this.table}`);
            console.log("Successfully truncated table", this.table);
        } catch (error: any) {
            console.error("Failed to truncate table!");
            console.log(error.sqlMessage || error.message);
            throw error;
        }
    }
    public async addColumn(fieldName: string, type: string[]): Promise<void> {
        try {
            await database.query(
                `ALTER TABLE ${this.table} ADD COLUMN ${fieldName} ${type.join(' ')}`
            );
            console.log(`Successfully added column ${fieldName} to table ${this.table}`);
            this.fields.push({ fieldName, type });
        } catch (error: any) {
            console.error(`Failed to add column ${fieldName}`);
            console.log(error.sqlMessage || error.message);
            throw error;
        }
    }
    public async dropColumn(columnName: string): Promise<void> {
        try {
            await database.query(
                `ALTER TABLE ${this.table} DROP COLUMN ${columnName}`
            );
            console.log(`Successfully dropped column ${columnName} from table ${this.table}`);
            this.fields = this.fields.filter(field => field.fieldName !== columnName);
        } catch (error: any) {
            console.error(`Failed to drop column ${columnName}`);
            console.log(error.sqlMessage || error.message);
            throw error;
        }
    }
    public async renameTable(newTableName: string): Promise<void> {
        try {
            await database.query(
                `ALTER TABLE ${this.table} RENAME TO ${newTableName}`
            );
            this.table = newTableName;
            console.log(`Successfully renamed table to ${newTableName}`);
        } catch (error: any) {
            console.error(`Failed to rename table ${this.table}`);
            console.log(error.sqlMessage || error.message);
            throw error;
        }
    }
    public async tableExists(): Promise<boolean> {
        try {
            const result = await database.query(
                `SELECT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = '${this.table}')`
            );
            return result.rows[0].exists;
        } catch (error: any) {
            console.error(`Failed to check if table ${this.table} exists`);
            console.log(error.sqlMessage || error.message);
            throw error;
        }
    }
    public async migrate(callback: (table: Migration) => Promise<void>): Promise<void> {
        try {
            await callback(this);
            console.log(`Migration for table ${this.table} completed successfully`);
        } catch (error) {
            console.error(`Migration for table ${this.table} failed`);
            throw error;
        }
    }
    public async sql(query:string):Promise<any[]>{
        try {
            const result = await database.query(query);
            return result;
        } catch (error) {
            throw error;
        }
    }
    public getFieldDefinitions(): FieldDefinitions {
        return this.fields.reduce((acc, field) => {
            acc[field.fieldName] = field.type;
            return acc;
        }, {} as FieldDefinitions);
    }
}
export default Migration;