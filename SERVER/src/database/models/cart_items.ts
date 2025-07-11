import cart_itemsMigration from "@migrations/cart_items_20250711191549";
class Cart_itemsModel {
    create = cart_itemsMigration.create;
    read = cart_itemsMigration.read;
    readOne = cart_itemsMigration.readOne;
    update = cart_itemsMigration.update;
    delete = cart_itemsMigration.delete;
}
export default new Cart_itemsModel();