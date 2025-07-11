import { Router } from "express";
import shipping_addressController from "@controllers/shipping_address";
const shipping_addressRouter = Router();
shipping_addressRouter.post("/",shipping_addressController.create);
shipping_addressRouter.get("/", shipping_addressController.read);
shipping_addressRouter.get("/:id", shipping_addressController.readOne);
shipping_addressRouter.put("/:id",shipping_addressController.update);
shipping_addressRouter.delete("/:id",shipping_addressController.delete);
export default shipping_addressRouter;