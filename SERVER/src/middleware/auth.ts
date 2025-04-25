import { JwtService } from "@services/jwt";
import { NextFunction, Request, Response } from "express";
export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const accessToken = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;
    const refreshToken = req.cookies.refresh_token;
    try {
        if (accessToken) {
            const decoded = JwtService.verify(accessToken);
            req.user = decoded;
            return next();
        } else if (refreshToken) {
            const decoded = JwtService.verifyRefreshToken(refreshToken);
            req.user = decoded;
            return next();
        }
        return res.status(403).json({ message: 'No valid token provided' });
    } catch (error) {
        return res.status(401).json({ message: 'Token is invalid or expired' });
    }
};
