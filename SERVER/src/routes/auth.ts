import { Router } from "express";
import { authMiddleware } from "src/middleware/auth";
import AuthController from "@controllers/auth";
const auth = Router();
auth.post("/login", AuthController.login);
auth.get("/",authMiddleware,(req,res)=>{
    res.send("You Are Sucecessfuly Login");
});
export default auth;
