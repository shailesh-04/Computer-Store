import { Router, Request, Response } from "express";
import ComputerController from "@controllers/computers";
const computer = Router();
computer.post("/", ComputerController.create);
computer.get("/", ComputerController.read);
computer.get("/:id", ComputerController.readOne);
computer.put("/:id", ComputerController.update);
computer.delete("/:id", ComputerController.delete);
export default computer;
