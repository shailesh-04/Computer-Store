import categoriesMigration from "@migrations/categories_20250711191423";
class CategoriesModel {
    create = categoriesMigration.create;
    read = categoriesMigration.read;
    readOne = categoriesMigration.readOne;
    update = categoriesMigration.update;
    delete = categoriesMigration.delete;
}
export default new CategoriesModel();