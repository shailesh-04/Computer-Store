import { Router } from "express";
import products from "./products";
import user from "./user";
import auth from "./auth";
import ordersRouter from "./orders";
import { catchErr } from "@color";
import categories from "./categories";
const router = Router();
try {
    router.use("/products",products);
    router.use("/categories",categories);
} catch (error) {
    catchErr(error, "Error in index route");
}
export default router;