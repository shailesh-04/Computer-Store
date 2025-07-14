import { Router } from "express";
import categoriesController from "@controllers/categories";
const controller = new categoriesController();
const categories = Router();

categories
    .route("/")
    .post(controller.create)
    .get(controller.read);
    
categories
    .route("/:id")
    .get(controller.readOne)
    .put(controller.update)
    .delete(controller.delete);

export default categories;