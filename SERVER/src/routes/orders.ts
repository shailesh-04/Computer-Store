import { Router } from "express";
import ordersController from "@controllers/orders";
const ordersRouter = Router();
ordersRouter.post("/",ordersController.create);
ordersRouter.get("/", ordersController.read);
ordersRouter.get("/:id", ordersController.readOne);
ordersRouter.put("/:id",ordersController.update);
ordersRouter.delete("/:id",ordersController.delete);
export default ordersRouter;