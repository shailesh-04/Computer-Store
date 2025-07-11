import product_imagesModel from "@models/product_images";
import { Request, Response } from "express";
class Product_imagesController {
    //POST api/product_images
    static async create(req: Request, res: Response) {
        try {
            const { demo } = req.body;
            const result: any = await product_imagesModel.create({ demo });
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
    // GET api/product_images
    static async read(req: Request, res: Response) {
        try {
            const result = await product_imagesModel.read();
            res.status(200).json({product_images:result});
        } catch (error: any) {
            console.error(error);
            res.status(500).json({
                message: "Failed to fetch data!",
                detail: error.message || error.sqlMessage
            });
        }
    }
    //GET api/product_images/:id
    static async readOne(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const result = await product_imagesModel.readOne(id);
            if (!result) {
                return res.status(404).json({ message: "No avalable any record this ID!" });
            }
            res.status(200).json({product_images:result});
        } catch (error: any) {
            console.error(error);
            res.status(500).json({
                message: "Failed to fetch fetch data!",
                detail: error.message || error.sqlMessage
            });
        }
    }
    // PUT api/product_images/:id
    static async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { demo } = req.body;
            const result: any = await product_imagesModel.update(id, {demo });
            res.status(200).json({
                message: "Successfully Update Record!",
                product_images: { id, demo}
            });
        } catch (error: any) {
            console.error(error);
            res.status(500).json({
                message: "Failed to update record!",
                detail: error.message || error.sqlMessage
            });
        }
    }
    //DELETE api/product_images/:id
    static async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await product_imagesModel.delete(id);
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
export default Product_imagesController ;