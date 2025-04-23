import { Router } from "express";
import computer from "./computer";
import user from "./user";
const router = Router();
router.use("/computer",computer);
router.use("/user",user);
export default router;