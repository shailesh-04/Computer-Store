import { JwtService } from "@services/jwt";
import { NextFunction, Request, Response } from "express";
export const authTokenMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const accessToken = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;
    const refreshToken = req.cookies.refresh_token;
    if (!accessToken && !refreshToken) {
        return res.status(403).json({ message: 'No valid token provided' });
    }
    try {
        if (accessToken && accessToken !== "null") {
            const decoded = await JwtService.verify(accessToken);
            req.user = {
                ...decoded,
                accessToken
            };
            return next();
        }
    } catch (error) {
        // Access token is invalid/expired, try refresh token
    }
    try {
        if (refreshToken) {
            const decoded: any = await JwtService.verifyRefreshToken(refreshToken);
            const newAccessToken = await JwtService.sign({ id: decoded.id, name: decoded.name });
            req.user = {
                ...decoded,
                accessToken: newAccessToken
            };
            return next();
        }
    } catch (error: any) {
        return res.status(401).json({ message: 'Token is invalid or expired', detail: error.message });
    }
    return res.status(403).json({ message: 'Authentication failed' });
};
