import { Router } from "express";
import computer from "./computer";
import user from "./user";
import auth from "./auth";
const router = Router();
router.use("/computer",computer);
router.use("/user",user);
router.use("/auth",auth);
export default router;