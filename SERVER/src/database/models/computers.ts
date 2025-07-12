import computersMigration from "@migrations/products_20250421053924";
import { IProducts } from "@interfaces/products";
class CumputerModel {
    create = computersMigration.create;
    read = computersMigration.read;
    readOne = computersMigration.readOne;
    update = computersMigration.update;
    delete = computersMigration.delete;
}
export default new CumputerModel();