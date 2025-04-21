import { Router,Request,Response } from "express";
import ComputerController from "@controllers/computers";
const router = Router();
router.get('/',ComputerController.read);
router.post('/',ComputerController.create);
export default router;