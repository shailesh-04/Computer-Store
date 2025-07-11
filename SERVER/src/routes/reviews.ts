import { Router } from "express";
import reviewsController from "@controllers/reviews";
const reviewsRouter = Router();
reviewsRouter.post("/",reviewsController.create);
reviewsRouter.get("/", reviewsController.read);
reviewsRouter.get("/:id", reviewsController.readOne);
reviewsRouter.put("/:id",reviewsController.update);
reviewsRouter.delete("/:id",reviewsController.delete);
export default reviewsRouter;