import { Router } from "express";
import path from "path";
import { adminViewMiddleware } from "src/middleware/admin";
const views = Router();

views.get("/admin/login", (req, res) => {
    res.render("authantication/login");
});
views.get("/admin/*splat", adminViewMiddleware, (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/index.html"));
});

export default views;