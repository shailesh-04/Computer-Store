import { Router } from "express";
import paymentsController from "@controllers/categories";
const controller = new paymentsController();
const paymentsRouter = Router();

paymentsRouter
    .route("/")
    .post(controller.create)
    .get(controller.read);

paymentsRouter
    .route("/:id")
    .get(controller.readOne)
    .put(controller.update)
    .delete(controller.delete);

export default paymentsRouter;