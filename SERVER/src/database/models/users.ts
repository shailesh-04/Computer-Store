import { IUsers } from "@interfaces/users";
import usersMigration,{migration} from "@migrations/users_20250423082932";
class ComputerModel {
    public create: typeof usersMigration.create;
    public read: typeof usersMigration.read;
    public readOne: typeof usersMigration.readOne;
    public update: typeof usersMigration.update;
    public delete: typeof usersMigration.delete;
    constructor() {
        this.create = usersMigration.create.bind(usersMigration);
        this.read = usersMigration.read.bind(usersMigration);
        this.readOne = usersMigration.readOne.bind(usersMigration);
        this.update = usersMigration.update.bind(usersMigration);
        this.delete = usersMigration.delete.bind(usersMigration);
    }
    public async login(parmam:any[]):Promise<any>{
        const result = await migration.sql("select name,email,password,image from users where email= ? and password =? ",parmam);
        return result;
    }
}

export default new ComputerModel();
