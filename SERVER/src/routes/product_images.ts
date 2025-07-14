import { Router } from "express";
import product_imagesController from "@controllers/categories";
const controller = new product_imagesController();
const product_imagesRouter = Router();

product_imagesRouter
    .route("/")
    .post(controller.create)
    .get(controller.read);

product_imagesRouter
    .route("/:id")
    .get(controller.readOne)
    .put(controller.update)
    .delete(controller.delete);

export default product_imagesRouter;