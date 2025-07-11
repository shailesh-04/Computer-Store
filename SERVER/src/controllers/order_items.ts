import order_itemsModel from "@models/order_items";
import { Request, Response } from "express";
class Order_itemsController {
    //POST api/order_items
    static async create(req: Request, res: Response) {
        try {
            const { demo } = req.body;
            const result: any = await order_itemsModel.create({ demo });
            res.status(201).json({
                message: "Successfully created new Record!",
                data: {
                    id: result.insertId,
                    demo
                }
            });
        } catch (error: any) {
            console.error(error);
            res.status(500).json({
                message: "Failed to create new record!",
                detail: error.message || error.sqlMessage
            });
        }
    }
    // GET api/order_items
    static async read(req: Request, res: Response) {
        try {
            const result = await order_itemsModel.read();
            res.status(200).json({order_items:result});
        } catch (error: any) {
            console.error(error);
            res.status(500).json({
                message: "Failed to fetch data!",
                detail: error.message || error.sqlMessage
            });
        }
    }
    //GET api/order_items/:id
    static async readOne(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const result = await order_itemsModel.readOne(id);
            if (!result) {
                return res.status(404).json({ message: "No avalable any record this ID!" });
            }
            res.status(200).json({order_items:result});
        } catch (error: any) {
            console.error(error);
            res.status(500).json({
                message: "Failed to fetch fetch data!",
                detail: error.message || error.sqlMessage
            });
        }
    }
    // PUT api/order_items/:id
    static async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { demo } = req.body;
            const result: any = await order_itemsModel.update(id, {demo });
            res.status(200).json({
                message: "Successfully Update Record!",
                order_items: { id, demo}
            });
        } catch (error: any) {
            console.error(error);
            res.status(500).json({
                message: "Failed to update record!",
                detail: error.message || error.sqlMessage
            });
        }
    }
    //DELETE api/order_items/:id
    static async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await order_itemsModel.delete(id);
            res.status(200).json({
                message: "Sucessfuly Delete Record!"
            });
        } catch (error: any) {
            console.error(error);
            res.status(500).json({
                message: "Failed to delete record!",
                detail: error.message || error.sqlMessage
            });
        }
    }
}
export default Order_itemsController ;