import { Router } from "express";
import product_imagesController from "@controllers/product_images";
const product_imagesRouter = Router();
product_imagesRouter.post("/",product_imagesController.create);
product_imagesRouter.get("/", product_imagesController.read);
product_imagesRouter.get("/:id", product_imagesController.readOne);
product_imagesRouter.put("/:id",product_imagesController.update);
product_imagesRouter.delete("/:id",product_imagesController.delete);
export default product_imagesRouter;