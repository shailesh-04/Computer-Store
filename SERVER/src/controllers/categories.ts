import categoriesModel from "@models/categories";
import { Request, Response } from "express";
class CategoriesController {
    private model: categoriesModel;
    constructor() {
        this.model = new categoriesModel();
    }
    //POST api/categories
    create = async (req: Request, res: Response) => {
        try {
            const { name, slug } = req.body;
            const result: any = await this.model.create({ name, slug });
            res.status(201).json({
                message: "Successfully created new Record!",
                data: {
                    id: result.insertId,
                    name,
                    slug
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
    // GET api/categories
    read = async (req: Request, res: Response) => {
        try {
            
            const result = await this.model.read();
            res.status(200).json({ categories: result });
        } catch (error: any) {
            console.error(error);
            res.status(500).json({
                message: "Failed to fetch data!",
                detail: error.message || error.sqlMessage
            });
        }
    }
    //GET api/categories/:id
    readOne = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const result = await this.model.readOne(id);
            if (!result) {
                return res.status(404).json({ message: "No avalable any record this ID!" });
            }
            res.status(200).json({ categories: result });
        } catch (error: any) {
            console.error(error);
            res.status(500).json({
                message: "Failed to fetch fetch data!",
                detail: error.message || error.sqlMessage
            });
        }
    }
    // PUT api/categories/:id
    update = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { name, slug } = req.body;
            const result: any = await this.model.update(id, { name, slug });
            res.status(200).json({
                message: "Successfully Update Record!",
                categories: { id, name, slug }
            });
        } catch (error: any) {
            console.error(error);
            res.status(500).json({
                message: "Failed to update record!",
                detail: error.message || error.sqlMessage
            });
        }
    }
    //DELETE api/categories/:id
    delete = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const result = await this.model.exists(id);
            if (!result) {
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
export default CategoriesController;