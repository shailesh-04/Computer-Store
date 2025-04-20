import { Router } from "express";
import computer from "./computer";
const router = Router();

router.use("/computer",computer);

export default router;