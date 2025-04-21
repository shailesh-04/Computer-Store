import computersMigration from "@migrations/computers_20250421053924";
import { IComputers } from "@interfaces/computers";
class CumputerModel{
    async create(body:IComputers):Promise<any>{
        return await computersMigration.create(body);
    }
    async read():Promise<IComputers[]>{
        const result = await computersMigration.read();
        return result;
    }
    async readOne(id:string):Promise<IComputers[]>{
        const result = await computersMigration.readOne(id);
        return result;
    }
    async update(id:string,body:IComputers){
        return await computersMigration.update(id,body);
    }
    async delete(id:string):Promise<any>{
        return await computersMigration.delete(id);
    }
}

export default new CumputerModel();