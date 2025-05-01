import ordersMigration from "@migrations/orders_20250501093800";
class OrdersModel {
    create = ordersMigration.create;
    read = ordersMigration.read;
    readOne = ordersMigration.readOne;
    update = ordersMigration.update;
    delete = ordersMigration.delete;
}
export default new OrdersModel();