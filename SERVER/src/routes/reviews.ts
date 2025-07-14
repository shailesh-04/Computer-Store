import { Router } from "express";
import reviewsController from "@controllers/categories";
const controller = new reviewsController();
const reviewsRouter = Router();

reviewsRouter
    .route("/")
    .post(controller.create)
    .get(controller.read);

reviewsRouter
    .route("/:id")
    .get(controller.readOne)
    .put(controller.update)
    .delete(controller.delete);

export default reviewsRouter;