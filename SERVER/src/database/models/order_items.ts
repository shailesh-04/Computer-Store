import order_itemsMigration from "@migrations/order_items_20250711191627";
class Order_itemsModel {
    create = order_itemsMigration.create;
    read = order_itemsMigration.read;
    readOne = order_itemsMigration.readOne;
    update = order_itemsMigration.update;
    delete = order_itemsMigration.delete;
}
export default new Order_itemsModel();