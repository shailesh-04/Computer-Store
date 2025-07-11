import paymentsModel from "@models/payments";
import { Request, Response } from "express";
class PaymentsController {
    //POST api/payments
    static async create(req: Request, res: Response) {
        try {
            const { demo } = req.body;
            const result: any = await paymentsModel.create({ demo });
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
    // GET api/payments
    static async read(req: Request, res: Response) {
        try {
            const result = await paymentsModel.read();
            res.status(200).json({payments:result});
        } catch (error: any) {
            console.error(error);
            res.status(500).json({
                message: "Failed to fetch data!",
                detail: error.message || error.sqlMessage
            });
        }
    }
    //GET api/payments/:id
    static async readOne(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const result = await paymentsModel.readOne(id);
            if (!result) {
                return res.status(404).json({ message: "No avalable any record this ID!" });
            }
            res.status(200).json({payments:result});
        } catch (error: any) {
            console.error(error);
            res.status(500).json({
                message: "Failed to fetch fetch data!",
                detail: error.message || error.sqlMessage
            });
        }
    }
    // PUT api/payments/:id
    static async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { demo } = req.body;
            const result: any = await paymentsModel.update(id, {demo });
            res.status(200).json({
                message: "Successfully Update Record!",
                payments: { id, demo}
            });
        } catch (error: any) {
            console.error(error);
            res.status(500).json({
                message: "Failed to update record!",
                detail: error.message || error.sqlMessage
            });
        }
    }
    //DELETE api/payments/:id
    static async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await paymentsModel.delete(id);
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
export default PaymentsController ;