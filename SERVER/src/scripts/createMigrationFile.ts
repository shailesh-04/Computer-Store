import fs from "fs";
import path from "path";
const [, , arg] = process.argv;
if (!arg) {
    console.error("❌ Please provide a class name as an argument.");
    process.exit(1);
}
const className = arg.charAt(0).toUpperCase() + arg.slice(1);
const tableName = arg.toLowerCase();
const timestamp = new Date().toISOString().replace(/[-:.TZ]/g, "").slice(0, 14);
const fileName = `${arg}_${timestamp}.ts`;
const targetDir = path.resolve(__dirname, "../database/migrations");
const filePath = path.join(targetDir, fileName);
const interfaceDir = path.resolve(__dirname, "../interfaces");
const interfaceFilePath = path.join(interfaceDir, `${tableName}.ts`);
const migrationContent = `import database from "@config/database";
import { IClass${className}, I${className} } from "@interfaces/${tableName}";
import Migration from "src/utils/migration";
class ${className} implements IClass${className} {
    public migration: Migration;
    constructor() {
        this.migration = new Migration("${tableName}", {
            id: ["INT", "AUTO_INCREMENT", "PRIMARY KEY"],
                demo: ["VARCHAR(100)", "NOT NULL"],
            created_at: ["TIMESTAMP", "DEFAULT CURRENT_TIMESTAMP"],
            updated_at: ["TIMESTAMP", "DEFAULT CURRENT_TIMESTAMP", "ON UPDATE CURRENT_TIMESTAMP"]
        });
    }
    async create(body: I${className}): Promise<any[]> {
        const { demo } = body;
        const result = await database.query(\`INSERT INTO ${tableName}(demo) VALUES (?)\`, [demo]);
        return result;
    }
    async update(id: string, body: I${className}): Promise<any[]> {
        const { demo } = body;
        const result = await database.query(\`UPDATE ${tableName} SET demo = ? WHERE id = ?\`, [demo, id]);
        return result;
    }
    async read(): Promise<I${className}[]> {
        const rows = await database.query(\`SELECT * FROM ${tableName} ORDER BY id DESC\`);
        return rows as I${className}[];
    }
    async readOne(id: string): Promise<I${className}[]> {
        const rows = await database.query(\`SELECT * FROM ${tableName} WHERE id = ?\`, [id]);
        return rows as I${className}[];
    }
    async delete(id: string): Promise<any[]> {
        const [result] = await database.query(\`DELETE FROM ${tableName} WHERE id = ?\`, [id]);
        return result;
    }
}
const ${arg}Migration = new ${className}();
export const migration = ${arg}Migration.migration;
export default ${arg}Migration;
`;
const interfaceContent = `import Migration from "@utils/migration";
export interface I${className} {
    id?: string;
    demo: string;
    created_at?:string;
    updated_at?:string;
}
export interface IClass${className} {
    migration: Migration;
    create(body: I${className}): Promise<any[]>;
    update(id: string, body: I${className}): Promise<any[]>;
    read(): Promise<I${className}[]>;
    readOne(id: string): Promise<I${className}[]>;
    delete(id: string): Promise<any[]>;
}
`;
fs.mkdirSync(targetDir, { recursive: true });
fs.mkdirSync(interfaceDir, { recursive: true });

if (!fs.existsSync(interfaceFilePath)) {
    fs.writeFileSync(filePath, migrationContent);
    console.log(`✅ Migration file created: ${filePath}`);
    fs.writeFileSync(interfaceFilePath, interfaceContent);
    console.log(`✅ Interface file created: ${interfaceFilePath}`);
} else {
    console.log(`ℹ️ Interface already exists: ${interfaceFilePath}`);
}
