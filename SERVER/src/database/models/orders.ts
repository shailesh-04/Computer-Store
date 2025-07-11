import { IOrders } from "@interfaces/orders";
import ordersMigration, { migration } from "@migrations/orders_20250501093800";
class OrdersModel {
    create = ordersMigration.create;
    read = ordersMigration.read;
    readOne = ordersMigration.readOne;
    update = ordersMigration.update;
    delete = ordersMigration.delete;

    userOrder = async (id: string):Promise<any[]> => {
        const rows = await migration.sql(`
            SELECT 
            u.id as 'order_id',u.created_at, u.user_id,u.computer_id,u.quantity,u.total_price,u.status,brand,c.model,c.processor,c.ram,c.storage,c.graphics_card,c.operating_system,c.screen_size,c.price,c.stock_quantity,c.descrition,c.image
            FROM orders u join computers c on c.id = u.computer_id WHERE u.user_id = ? order by u.id desc`, [id]);
        return rows as any[];
    }

}
export default new OrdersModel();