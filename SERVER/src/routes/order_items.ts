import { Router } from "express";
import OrderItemsControllers from "@controllers/order_items";
const orderItems = Router();
const controller = new OrderItemsControllers();

orderItems.route("/")
    .post(controller.create)
    .get(controller.read);

orderItems.route("/:id")
    .get(controller.readOne)
    .put(controller.update)
    .delete(controller.delete);
    
export default orderItems;