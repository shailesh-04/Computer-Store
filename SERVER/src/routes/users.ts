import { Router } from "express";
import usersController from "@controllers/categories";
const controller = new usersController();
const usersRouter = Router();

usersRouter
    .route("/")
    .post(controller.create)
    .get(controller.read);

usersRouter
    .route("/:id")
    .get(controller.readOne)
    .put(controller.update)
    .delete(controller.delete);

export default usersRouter;