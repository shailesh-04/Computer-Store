import ProductImagesModel from "@models/product_images";
import { Request, Response } from "express";
class ProductImagesController {
    private model: ProductImagesModel;
    constructor() {
        this.model = new ProductImagesModel();
    }
    //POST api/product_images
    create = async (req: Request, res: Response) => {
        try {
            const { name } = req.body;
            const payload: any = await this.model.create({ name });
            res.status(201).json({
                message: "Successfully created new Record!",
                payload: {
                    id: payload.insertId,
                    name
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
    read = async (req: Request, res: Response) => {
        try {
            
            const result = await this.model.read();
            res.status(200).json({ product_images: result });
        } catch (error: any) {
            console.error(error);
            res.status(500).json({
                message: "Failed to fetch data!",
                detail: error.message || error.sqlMessage
            });
        }
    }
    //GET api/product_images/:id
    readOne = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const payload = await this.model.readOne(id);
            if (!payload || payload.length === 0) {
                return res.status(404).json({ message: "No available record with this ID!" });
            }
            res.status(200).json({ payload: payload[0] });
        } catch (error: any) {
            console.error(error);
            res.status(500).json({
                message: "Failed to fetch fetch data!",
                detail: error.message || error.sqlMessage
            });
        }
    }
    // PUT api/product_images/:id
    update = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { name } = req.body;
            const payload: any = await this.model.update(id, { name });
            res.status(200).json({
                message: "Successfully Update Record!",
                payload: { id, name }
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
    delete = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const payload = await this.model.exists(id);
            if (!payload || payload.length === 0) {
                return res.status(404).json({ message: "No available record with this ID!" });
            }
            await this.model.delete(id);
            res.status(200).json({
                message: "Successfully Deleted Record!"
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
export default ProductImagesController;