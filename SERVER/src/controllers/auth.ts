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

            res.cookie('refresh_token',refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            });
            
            res.status(200).json({
                message: "Successfully Login!",
                data: result,
                accessToken
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

export default AuthController;