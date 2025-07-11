import reviewsModel from "@models/reviews";
import { Request, Response } from "express";
class ReviewsController {
    //POST api/reviews
    static async create(req: Request, res: Response) {
        try {
            const { demo } = req.body;
            const result: any = await reviewsModel.create({ demo });
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
    // GET api/reviews
    static async read(req: Request, res: Response) {
        try {
            const result = await reviewsModel.read();
            res.status(200).json({reviews:result});
        } catch (error: any) {
            console.error(error);
            res.status(500).json({
                message: "Failed to fetch data!",
                detail: error.message || error.sqlMessage
            });
        }
    }
    //GET api/reviews/:id
    static async readOne(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const result = await reviewsModel.readOne(id);
            if (!result) {
                return res.status(404).json({ message: "No avalable any record this ID!" });
            }
            res.status(200).json({reviews:result});
        } catch (error: any) {
            console.error(error);
            res.status(500).json({
                message: "Failed to fetch fetch data!",
                detail: error.message || error.sqlMessage
            });
        }
    }
    // PUT api/reviews/:id
    static async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { demo } = req.body;
            const result: any = await reviewsModel.update(id, {demo });
            res.status(200).json({
                message: "Successfully Update Record!",
                reviews: { id, demo}
            });
        } catch (error: any) {
            console.error(error);
            res.status(500).json({
                message: "Failed to update record!",
                detail: error.message || error.sqlMessage
            });
        }
    }
    //DELETE api/reviews/:id
    static async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await reviewsModel.delete(id);
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
export default ReviewsController ;