import { Router } from "express";
import paymentsController from "@controllers/payments";
const paymentsRouter = Router();
paymentsRouter.post("/",paymentsController.create);
paymentsRouter.get("/", paymentsController.read);
paymentsRouter.get("/:id", paymentsController.readOne);
paymentsRouter.put("/:id",paymentsController.update);
paymentsRouter.delete("/:id",paymentsController.delete);
export default paymentsRouter;