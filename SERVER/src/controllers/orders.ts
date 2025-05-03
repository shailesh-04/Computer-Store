import ordersModel from "@models/orders";
import { Request, Response } from "express";
class OrdersController {
    //POST api/orders
    static async create(req: Request, res: Response) {
        try {
            const { user_id, computer_id, quantity, total_price, status } = req.body;
            const result: any = await ordersModel.create({ user_id, computer_id, quantity, total_price, status });
            res.status(201).json({
                message: "Successfully created new Record!",
                data: {
                    id: result.insertId,
                    user_id, computer_id, quantity, total_price, status
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
    //POST api/orders/order
    static async order(req: Request, res: Response) {
        try {
            const { user_id, computer_id, quantity, total_price } = req.body;
            let computer_ids = computer_id.split(",");
            let quantitys = quantity.split(",");
            const status = 'pending';
            let result = '';
            computer_ids.forEach(async (value: string, index: number, array: string[]) => {
                result += await ordersModel.create({ user_id, computer_id: computer_ids[index], quantity: quantitys[index], total_price, status });
            })

            res.status(201).json({
                message: "Successfully created new Record!",
                data: {
                    id: result,
                    user_id, computer_id, quantity, total_price, status
                }
            });
        } catch (error: any) {
            console.error(error);
            res.status(500).json({
                message: "Failed payment re try order!",
                detail: error.message || error.sqlMessage
            });
        }
    }
    // GET api/orders
    static async read(req: Request, res: Response) {
        try {
            const result = await ordersModel.read();
            res.status(200).json({ orders: result });
        } catch (error: any) {
            console.error(error);
            res.status(500).json({
                message: "Failed to fetch data!",
                detail: error.message || error.sqlMessage
            });
        }
    }
    //GET api/orders/:id
    static async readOne(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const result = await ordersModel.readOne(id);
            if (!result) {
                return res.status(404).json({ message: "No avalable any record this ID!" });
            }
            res.status(200).json({ orders: result });
        } catch (error: any) {
            console.error(error);
            res.status(500).json({
                message: "Failed to fetch fetch data!",
                detail: error.message || error.sqlMessage
            });
        }
    }
    // PUT api/orders/:id
    static async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { user_id, computer_id, quantity, total_price, status } = req.body;
            const result: any = await ordersModel.update(id, { user_id, computer_id, quantity, total_price, status });
            res.status(200).json({
                message: "Successfully Update Record!",
                orders: { id, user_id, computer_id, quantity, total_price, status }
            });
        } catch (error: any) {
            console.error(error);
            res.status(500).json({
                message: "Failed to update record!",
                detail: error.message || error.sqlMessage
            });
        }
    }
    //DELETE api/orders/:id
    static async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await ordersModel.delete(id);
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
    //GET  api/order/:id/user
    static async userOrder(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const result = await ordersModel.userOrder(id);
            if (!result.length) {
                return res.status(404).json({ orders: result, message: "No avalable any record this ID!" });
            }
            res.status(200).json({ orders: result });
        } catch (error: any) {
            console.error(error.message || error.sqlMessage);
            res.status(500).json({
                message: "Failed to fetch fetch data!",
                detail: error.message || error.sqlMessage
            });
        }
    }
}
export default OrdersController;