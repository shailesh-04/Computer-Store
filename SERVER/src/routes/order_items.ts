import { Router } from "express";
import order_itemsController from "@controllers/order_items";
const order_itemsRouter = Router();
order_itemsRouter.post("/",order_itemsController.create);
order_itemsRouter.get("/", order_itemsController.read);
order_itemsRouter.get("/:id", order_itemsController.readOne);
order_itemsRouter.put("/:id",order_itemsController.update);
order_itemsRouter.delete("/:id",order_itemsController.delete);
export default order_itemsRouter;