import express, { Response, Request } from "express";
import database from "./database";
import cookieParser from "cookie-parser";
import cors from "cors";
import router from "@routes/_index";
import path from "path";
import views from "@routes/_views";
class App {
    public app: express.Application;
    constructor() {
        this.app = express();
        this.middleware();
        this.config();
        this.router();
    }
    private config(): void {
        database.testConnection();
        this.app.set('view engine', 'ejs');
        this.app.set('views', path.join(__dirname, '../views/'));
    }
    private middleware(): void {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cookieParser());
        this.app.use(cors());
        this.app.use(express.static(path.join(__dirname, "../../public")));
    }
    private router(): void {
        this.app.use("/api", router);
        this.app.use("/", views);
        this.app.get("*splat", (req: Request, res: Response) => {
            res.sendFile(path.join(__dirname, "../../public/index.html"));
        });
    }
}
export default new App().app;