import { Router } from "express";
import usersController from "@controllers/users";
import { authTokenMiddleware } from "src/middleware/auth";
import { adminApiMiddleware } from "src/middleware/admin";
const user = Router();
user.post("/",usersController.create);
user.get("/", usersController.read);
user.get("/:id", usersController.readOne);
user.put("/:id",authTokenMiddleware,usersController.update);
user.delete("/:id",adminApiMiddleware,usersController.delete);
export default user;
