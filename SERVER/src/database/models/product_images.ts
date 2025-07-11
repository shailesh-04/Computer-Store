import product_imagesMigration from "@migrations/product_images_20250711191522";
class Product_imagesModel {
    create = product_imagesMigration.create;
    read = product_imagesMigration.read;
    readOne = product_imagesMigration.readOne;
    update = product_imagesMigration.update;
    delete = product_imagesMigration.delete;
}
export default new Product_imagesModel();