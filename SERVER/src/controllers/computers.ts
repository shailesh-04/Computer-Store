import { catchErr } from "@color";
import computerModel from "@models/computers";
import { Request, Response } from "express";
class ComputerController {
    static async read(req: Request, res: Response) {
        try {
            const result = await computerModel.read();
            res.status(200).json(result);
        } catch (error:any) {
            res.status(500).json({message:"Feild to read record!",detail:error.message|error.sqlMessage});
        }
    }
    static async create(req: Request, res: Response) {
        try {
            const {brand, model, processor, ram, storage,graphics_card, operating_system, screen_size,price, stock_quantity} = req.body;
            const result = await computerModel.create({brand, model, processor, ram, storage,graphics_card, operating_system, screen_size,price, stock_quantity});
            res.status(200).json(result);
        } catch (error:any) {
            console.log(error);
            res.status(500).json({message:"Feild to create record!",detail:error.message|error.sqlMessage});
        }
    }
}

export default ComputerController;