import OrderItemsModel from "@models/order_items";
import { Request, Response } from "express";
class OrderItemsControllers {
    //POST api/order_items
    private model: OrderItemsModel;
    constructor() {
        this.model = new OrderItemsModel();
    }
    create = async (req: Request, res: Response) => {
        try {
            const { order_id, product_id, quantity, price } = req.body;
            const result: any = await this.model.create({ order_id, product_id, quantity, price });
            res.status(201).json({
                message: "Successfully created new Record!",
                data: {
                    id: result.insertId,
                    order_id, product_id, quantity, price
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
    read = async (req: Request, res: Response) => {
        try {
            const result = await this.model.read();
            res.status(200).json({ order_items: result });
        } catch (error: any) {
            console.error(error);
            res.status(500).json({
                message: "Failed to fetch data!",
                detail: error.message || error.sqlMessage
            });
        }
    }
    //GET api/order_items/:id
    readOne = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const result = await this.model.readOne(id);
            if (!result) {
                return res.status(404).json({ message: "No avalable any record this ID!" });
            }
            res.status(200).json({ order_items: result });
        } catch (error: any) {
            console.error(error);
            res.status(500).json({
                message: "Failed to fetch fetch data!",
                detail: error.message || error.sqlMessage
            });
        }
    }
    // PUT api/order_items/:id
    update = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { order_id, product_id, quantity, price } = req.body;
            const result: any = await this.model.update(id, { order_id, product_id, quantity, price });
            res.status(200).json({
                message: "Successfully Update Record!",
                order_items: { id, order_id, product_id, quantity, price }
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
    delete = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            await this.model.delete(id);
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
export default OrderItemsControllers;