import { Router } from "express";
const views = Router();

views.get("/login",(req,res)=>{
    res.render("authantication/login");
});

export default views;