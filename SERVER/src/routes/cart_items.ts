import CartItemsControllers from "@controllers/cart_items";
import { Router } from "express";
const cartItem = Router();
const controller = new CartItemsControllers();
cartItem.route("/")
    .post(controller.create)
    .get(controller.read);

cartItem.route("/:id")
    .get(controller.readOne)
    .put(controller.update)
    .delete(controller.delete);
    
export default cartItem;