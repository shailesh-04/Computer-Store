import users from "@models/users";
import { Request, Response } from "express";
class UsersController {
    //POST api/user
    static async create(req: Request, res: Response) {
        try {
            const { name, email, password, image } = req.body;
            const result: any = await users.create({ name, email, password, image });
            res.status(201).json({
                message: "Successfully created new user!",
                data: {
                    id: result.insertId,
                    name,
                    email,
                    password,
                    image
                }
            });
        } catch (error: any) {
            console.error(error);
            res.status(500).json({
                message: "Failed to create user record!",
                detail: error.message || error.sqlMessage
            });
        }
    }
    // GET api/user
    static async read(req: Request, res: Response) {
        try {
            const result = await users.read();
            res.status(200).json(result);
        } catch (error: any) {
            console.error(error);
            res.status(500).json({
                message: "Failed to fetch users!",
                detail: error.message || error.sqlMessage
            });
        }
    }
    //GET api/user/:id
    static async readOne(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const result = await users.readOne(id);
            if (!result) {
                return res.status(404).json({ message: "User not found!" });
            }
            res.status(200).json(result);
        } catch (error: any) {
            console.error(error);
            res.status(500).json({
                message: "Failed to fetch user!",
                detail: error.message || error.sqlMessage
            });
        }
    }
    // PUT api/user/:id
    static async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { name, email, password, image } = req.body;
            const result: any = await users.update(id, { name, email, password, image });

            res.status(200).json({
                message: "User updated successfully!",
                data: { id, name, email, password, image }
            });
        } catch (error: any) {
            console.error(error);
            res.status(500).json({
                message: "Failed to update user!",
                detail: error.message || error.sqlMessage
            });
        }
    }
    //DELETE api/user/:id
    static async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await users.delete(id);
            res.status(200).json({
                message: "User deleted successfully!"
            });
        } catch (error: any) {
            console.error(error);
            res.status(500).json({
                message: "Failed to delete user!",
                detail: error.message || error.sqlMessage
            });
        }
    }
    //POST api/user/login
    static async login(req: Request, res: Response):Promise<void> {
        try {
            const { email, password } = req.body;
            if (!email || !password) {

                res.status(406).json({
                    message: "invalid input data!",
                    data: { email, password }
                });
                return
            }
            const [result] = await users.login([email, password]);
            if (!result) {

                res.status(406).json({
                    message: "invalid valid email and password!",
                    data: { email, password }
                });
                return;
            }
            res.status(200).json({
                message: "Successfully Login!",
                data: result
            });
        } catch (error: any) {
            console.error(error);
            res.status(500).json({
                message: "Failed to login user!",
                detail: error.message || error.sqlMessage
            });
        }
    }
}
export default UsersController;
