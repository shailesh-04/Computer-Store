import { Router } from "express";
import { authTokenMiddleware } from "src/middleware/auth";
import AuthController from "@controllers/auth";
const auth = Router();

auth.post("/login", AuthController.login);
auth.post("/loginView", AuthController.loginView);
auth.get("/",authTokenMiddleware,AuthController.getAuthToken);
auth.get("/logout",AuthController.logout);
auth.post("/singin",AuthController.signin);

export default auth;
