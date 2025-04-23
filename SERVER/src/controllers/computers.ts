import computerModel from "@models/computers";
import { Request, Response } from "express";

class ComputerController {
    //POST api/computer
    static async create(req: Request, res: Response) {
        try {
            const {
                brand, model, processor, ram, storage,
                graphics_card, operating_system, screen_size,
                stock_quantity, descrition, image
            } = req.body;

            const price = Number(req.body.price);
            const result: any = await computerModel.create({
                brand, model, processor, ram, storage,
                graphics_card, operating_system, screen_size,
                price, stock_quantity, descrition, image
            });

            res.status(201).json({
                message: "Successfully inserted new computer!",
                data: { id: result.insertId, brand, model, processor, ram, storage, graphics_card, operating_system, screen_size, price, stock_quantity, descrition, image }
            });
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ message: "Failed to create record!", detail: error.message || error.sqlMessage });
        }
    }
    //GET api/computer
    static async read(req: Request, res: Response) {
        try {
            const result = await computerModel.read();
            res.status(200).json(result);
        } catch (error: any) {
            res.status(500).json({ message: "Failed to read records!", detail: error.message || error.sqlMessage });
        }
    }
    //GET api/computer/:id
    static async readOne(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const [result] = await computerModel.readOne(id);
            if (!result) {
                return res.status(404).json({ message: "Computer not found!" });
            }
            res.status(200).json(result);
        } catch (error: any) {
            res.status(500).json({ message: "Failed to read record!", detail: error.message || error.sqlMessage });
        }
    }
    //PUT api/computer/:id
    static async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const {
                brand, model, processor, ram, storage,
                graphics_card, operating_system, screen_size,
                stock_quantity, descrition, image
            } = req.body;

            const price = Number(req.body.price);
            const result = await computerModel.update(id, {
                brand, model, processor, ram, storage,
                graphics_card, operating_system, screen_size,
                price, stock_quantity, descrition, image
            });

            res.status(200).json({
                message: "Computer updated successfully!",
                data: { id, brand, model, processor, ram, storage, graphics_card, operating_system, screen_size, price, stock_quantity, descrition, image }
            });
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ message: "Failed to update record!", detail: error.message || error.sqlMessage });
        }
    }
    //DELETE api/computer/:id
    static async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await computerModel.delete(id);
            res.status(200).json({ message: "Computer deleted successfully!", data: { id } });
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ message: "Failed to delete record!", detail: error.message || error.sqlMessage });
        }
    }
}

export default ComputerController;
