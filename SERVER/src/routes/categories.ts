import { Router } from "express";
import categoriesController from "@controllers/categories";
const categoriesRouter = Router();
categoriesRouter.post("/",categoriesController.create);
categoriesRouter.get("/", categoriesController.read);
categoriesRouter.get("/:id", categoriesController.readOne);
categoriesRouter.put("/:id",categoriesController.update);
categoriesRouter.delete("/:id",categoriesController.delete);
export default categoriesRouter;