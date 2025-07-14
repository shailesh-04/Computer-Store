import { Router } from "express";
import shipping_addressController from "@controllers/categories";
const controller = new shipping_addressController();
const shipping_addressRouter = Router();

shipping_addressRouter
    .route("/")
    .post(controller.create)
    .get(controller.read);

shipping_addressRouter
    .route("/:id")
    .get(controller.readOne)
    .put(controller.update)
    .delete(controller.delete);

export default shipping_addressRouter;