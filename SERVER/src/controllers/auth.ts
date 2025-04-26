import users from "@models/users";
import { Request, Response } from "express";
import { JwtService, TokenPayload } from "@services/jwt";
class AuthController {
    //POST api/auth/login
    static async login(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                res.status(406).json({
                    message: "invalid input data!",
                    data: { email, password }
                });
                return
            }
            const [result]: any = await users.login([email, password]);
            if (!result) {
                res.status(406).json({
                    message: "invalid valid email and password!",
                    data: { email, password }
                });
                return;
            }
            const accessToken = await JwtService.sign({ id: result.id, name: result.name });
            const refreshToken = await JwtService.signRefreshToken({ id: result.id, name: result.name });
            res.cookie('refresh_token', refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });

            res.status(200).json({
                message: "Successfully Login!",
                data: result,
                accessToken: accessToken
            });

        } catch (error: any) {
            console.error(error);
            res.status(500).json({
                message: "Failed to login user!",
                detail: error.message || error.sqlMessage
            });
        }
    }
    static async logout(req: Request, res: Response): Promise<void> {
        try {
            res.clearCookie('refresh_token', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
            });

            res.status(200).json({
                message: "Successfully logged out!",
            });
        } catch (error: any) {
            res.status(500).json({
                message: "Failed to logout!",
                detail: error.message,
            });
        }
    }

    static async getAuthToken(req: Request, res: Response): Promise<void> {
        if (!req.user?.id) {
            res.status(404).json({ message: "Faild to getting user!" });
            return
        }
        try {
            const [result] = await users.readOne(req.user?.id);
            res.status(200).json({
                message: "success",
                data: result,
                accessToken: req.user.accessToken
            });
        } catch (error: any) {
            res.status(500).json({
                message: "Failed to user Authanticatoin!",
                detail: error.message || error.sqlMessage
            });
        }
    }
    static async signin(req: Request, res: Response): Promise<void> {
        try {
            const { name, email, password, image } = req.body;
            if (!name || !email || !password) {
                res.status(406).json({
                    message: "invalid input data!",
                    data: { name, email, password }
                });
                return
            }
            const result: any = await users.create({ name, email, password, image });

            const accessToken = await JwtService.sign({ id: result.insertId, name: result.name });
            const refreshToken = await JwtService.signRefreshToken({ id: result.insertId, name: result.name });
            res.cookie('refresh_token', refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });
            res.status(201).json({
                message: "Successfully created new user!",
                data: {
                    id: result.insertId,
                    name,
                    email,
                    password,
                    image
                },
                accessToken: accessToken
            });
        } catch (error: any) {
            console.error(error);
            res.status(500).json({
                message: "Failed to create user record!",
                detail: error.message || error.sqlMessage
            });
        }
    }
    //POST api/auth/login
    static async loginView(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                res.status(406).json({
                    message: "invalid input data!",
                    data: { email, password }
                });
                return
            }
            const [result]: any = await users.login([email, password]);
            if (!result) {
                res.status(406).json({
                    message: "invalid valid email and password!",
                    data: { email, password }
                });
                return;
            }
            const accessToken = await JwtService.sign({ id: result.id, name: result.name });
            const refreshToken = await JwtService.signRefreshToken({ id: result.id, name: result.name });
            res.cookie('refresh_token', refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });
            res.redirect("/admin/users");

        } catch (error: any) {
            console.error(error);
            res.status(500).json({
                message: "Failed to login user!",
                detail: error.message || error.sqlMessage
            });
        }
    }
}

export default AuthController;