import computersMigration from "@migrations/computers_20250421053924";
import { IComputers } from "@interfaces/computers";
class CumputerModel {
    create = computersMigration.create;
    read = computersMigration.read;
    readOne = computersMigration.readOne;
    update = computersMigration.update;
    delete = computersMigration.delete;
}
export default new CumputerModel();