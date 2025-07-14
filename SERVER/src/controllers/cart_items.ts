import CartItemsModel from "@models/cart_items";
import { Request, Response } from "express";
class CartItemsControllers {
    //POST api/cart_items
    private model: CartItemsModel;
    constructor() {
        this.model = new CartItemsModel();
    }
    create = async (req: Request, res: Response) => {
        try {
            const { user_id, product_id, quantity } = req.body;
            if (!user_id || !product_id || !quantity) {
                return res.status(400).json({ message: "Missing required fields!" });
            }
            if (isNaN(quantity) || quantity <= 0) {
                return res.status(400).json({ message: "Quantity must be a positive number!" });
            }
            const existingItem = await this.model.readByUser(user_id);
            if (existingItem.some(item => item.product_id === product_id)) {
                return res.status(400).json({ message: "This product is already in the cart!" });
            }
            // Create new cart item
            const payload: any = await this.model.create({ user_id, product_id, quantity });
            res.status(201).json({
                message: "Successfully created new Record!",
                payload: {
                    id: payload.insertId,
                    user_id,
                    product_id,
                    quantity
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
    // GET api/cart_items
    read = async (req: Request, res: Response) => {
        try {
            const payload = await this.model.read();
            if (payload.length === 0) {
                return res.status(404).json({ message: "No records found!" });
            }
            res.status(200).json({ payload });
        } catch (error: any) {
            console.error(error);
            res.status(500).json({
                message: "Failed to fetch data!",
                detail: error.message || error.sqlMessage
            });
        }
    }
    //GET api/cart_items/:id
    readOne = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            if (!id || isNaN(Number(id))) {
                return res.status(400).json({ message: "ID parameter is required or must be a number!" });
            }
            const payload = await this.model.readOne(id);
            if (!payload) {
                return res.status(404).json({ message: "No available record for this ID!" });
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
    // PUT api/cart_items/:id
    update = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { user_id, product_id, quantity } = req.body;
            if (!id || isNaN(Number(id))) {
                return res.status(400).json({ message: "ID parameter is required or must be a number!" });
            }
            if (!user_id || !product_id || !quantity) {
                return res.status(400).json({ message: "Missing required fields!" });
            }
            const existingItem = await this.model.readOne(id);
            if (existingItem.length === 0) {
                return res.status(404).json({ message: "No available record for this ID!" });
            }
            const payload: any = await this.model.update(id, { user_id, product_id, quantity });
            res.status(200).json({
                message: "Successfully Update Record!",
                payload: { id, user_id, product_id, quantity }
            });
        } catch (error: any) {
            console.error(error);
            res.status(500).json({
                message: "Failed to update record!",
                detail: error.message || error.sqlMessage
            });
        }
    }
    //DELETE api/cart_items/:id
    delete = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            if (!id || isNaN(Number(id))) {
                return res.status(400).json({ message: "ID parameter is required or must be a number!" });
            }
            const existingItem = await this.model.readOne(id);
            if (existingItem.length === 0) {
                return res.status(404).json({ message: "No available record for this ID!" });
            }
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
export default CartItemsControllers;