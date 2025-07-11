import paymentsMigration from "@migrations/payments_20250711191718";
class PaymentsModel {
    create = paymentsMigration.create;
    read = paymentsMigration.read;
    readOne = paymentsMigration.readOne;
    update = paymentsMigration.update;
    delete = paymentsMigration.delete;
}
export default new PaymentsModel();