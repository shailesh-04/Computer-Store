import { Router } from "express";
import usersController from "@controllers/users";

const user = Router();
user.post("/", usersController.create);
user.get("/", usersController.read);
user.get("/:id", usersController.readOne);
user.put("/:id", usersController.update);
user.delete("/:id", usersController.delete);
user.post("/login",usersController.login);
export default user;
