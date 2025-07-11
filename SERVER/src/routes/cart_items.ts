import { Router } from "express";
import cart_itemsController from "@controllers/cart_items";
const cart_itemsRouter = Router();
cart_itemsRouter.post("/",cart_itemsController.create);
cart_itemsRouter.get("/", cart_itemsController.read);
cart_itemsRouter.get("/:id", cart_itemsController.readOne);
cart_itemsRouter.put("/:id",cart_itemsController.update);
cart_itemsRouter.delete("/:id",cart_itemsController.delete);
export default cart_itemsRouter;