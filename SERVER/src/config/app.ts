import express,{Response,Request} from "express";
import database from "./database";
import router from "@routes/_index";
 class App{
    public app:express.Application;
    constructor(){
        this.app = express();
        this.config();
        this.router();
    }
    private config():void{
        database.testConnection();
        this.app.use(express.json());        
    }
    private router():void{
        this.app.use("/api",router);
        this.app.get("/",(req:Request,res:Response)=>{
            res.send("*");
        });
    }
 }

 export default new App().app;