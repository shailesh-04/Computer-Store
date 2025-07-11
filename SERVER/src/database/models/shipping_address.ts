import shipping_addressMigration from "@migrations/shipping_address_20250711191650";
class Shipping_addressModel {
    create = shipping_addressMigration.create;
    read = shipping_addressMigration.read;
    readOne = shipping_addressMigration.readOne;
    update = shipping_addressMigration.update;
    delete = shipping_addressMigration.delete;
}
export default new Shipping_addressModel();