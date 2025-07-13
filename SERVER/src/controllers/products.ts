import ProductsModel from "@models/products";
import { Request, Response } from "express";
class ComputerController {
    //POST api/computer
    private model: ProductsModel;
    constructor() {
        this.model = new ProductsModel();
    }
     create = async (req: Request, res: Response) => {
        try {
            const { name, description, brand, category_id, price, quantity, thumbnail } = req.body;

            const _price = Number(price);
            if (!_price || isNaN(_price) || _price <= 0 || name === "" || description === "" || brand === "" || category_id === "" || quantity < 0) {
                return res.status(400).json({ message: "Invalid product data!" });
            }
            const result: any = await this.model.create({ name, description, brand, category_id, price: _price, quantity, thumbnail });

            res.status(201).json({
                message: "Successfully inserted new computer!",
                data: { id: result.insertId, name, description, brand, category_id, price: _price, quantity, thumbnail }
            });
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ message: "Failed to create record!", detail: error.message || error.sqlMessage });
        }
    }
    //GET api/computer
     read = async (req: Request, res: Response) => {
        try {
            const payload = await this.model.read();
            if(payload.length === 0)
                return res.status(404).json({ payload, message: "No products found!" });
            return res.status(200).json({ payload });
        } catch (error: any) {
            return res.status(500).json({ message: "Failed to read records!", detail: error.message || error.sqlMessage });
        }
    }
    //GET api/computer/:id
     readOne = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            if (Number.isNaN(Number(id))) {
                return res.status(400).json({ message: "ID is required or invalid!" });
            }
            const payload = await this.model.readOne(id);
            if (!payload) {
                return res.status(404).json({ message: "Product not found!" });
            }
            res.status(200).json({ payload });
        } catch (error: any) {
            res.status(500).json({ message: "Failed to read record!", detail: error.message || error.sqlMessage });
        }
    }
    //PUT api/computer/:id
    update = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const {
                name, description, brand, category_id, price, quantity, thumbnail
            } = req.body;

            const _price = Number(req.body.price);
            if (!id || !_price || isNaN(_price) || _price <= 0 || name === "" || description === "" || brand === "" || category_id === "" || quantity < 0) {
                return res.status(400).json({ message: "Invalid product data!" });
            }
            const result = await this.model.update(id, {
                name, description, brand, category_id, price: _price, quantity, thumbnail
            });
            res.status(200).json({
                message: "Product updated successfully!",
                payload: { id, name, description, brand, category_id, price: _price, quantity, thumbnail }
            });
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ message: "Failed to update record!", detail: error.message || error.sqlMessage });
        }
    }
    //DELETE api/computer/:id
     delete = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            if (Number.isNaN(Number(id))) {
                return res.status(400).json({ message: "ID is required! or invalid" });
            }
            const exists = await this.model.exists(id);
            if (!exists) {
                return res.status(404).json({ message: "Product not found!" });
            }

            await this.model.delete(id);
            res.status(200).json({ message: "Product deleted successfully!", data: { id } });
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ message: "Failed to delete record!", detail: error.message || error.sqlMessage });
        }
    }
    //GET api/product/search
     search = async (req: Request, res: Response) => {
        try {
            const { query } = req.query;
            if (!query || typeof query !== "string") {
                return res.status(400).json({ message: "Search query is required!" });
            }
            const payload = await this.model.search(query as string);
            if (payload.length === 0) {
                return res.status(404).json({ payload, message: "No products found!" });
            }
            return res.status(200).json({ payload});
        } catch (error: any) {
            return res.status(500).json({ message: "Failed to search records!", detail: error.message || error.sqlMessage });
        }
    }
}

export default ComputerController;
