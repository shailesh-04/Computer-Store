import { Router, Request, Response } from "express";
import ProductController from "@controllers/products";
const products = Router();
const controllers = new ProductController();

products.route("/")
    .post(controllers.create)
    .get(controllers.read);
products.get("/search", controllers.search);
products.route("/:id")
    .get(controllers.readOne)
    .put(controllers.update)
    .delete(controllers.delete);
export default products;
