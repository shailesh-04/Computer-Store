import { JwtService } from "@services/jwt";
import { NextFunction, Request, Response } from "express";
export const adminApiMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const admin = ["4"];
    const authHeader = req.headers['authorization'];
    const accessToken = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;
    const refreshToken = req.cookies.refresh_token;
    if (!accessToken && !refreshToken) {
        return res.status(403).json({ message: 'No valid token provided' });
    }
    try {
        if (accessToken && accessToken !== "null") {
            const decoded = await JwtService.verify(accessToken);
            if(!admin.includes(String(decoded.id)))
                return res.status(403).json({ message: 'Authentication failed' });
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
            if(!admin.includes(String(decoded.id)))
                return res.status(403).json({ message: 'Authentication failed' });

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


export const adminViewMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const admin = ["4"];
    const authHeader = req.headers['authorization'];
    const accessToken = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;
    const refreshToken = req.cookies.refresh_token;
    if (!accessToken && !refreshToken) {
        return res.redirect("/admin/login");
    }
    try {
        if (accessToken && accessToken !== "null") {
            const decoded = await JwtService.verify(accessToken);
            if(!admin.includes(String(decoded.id)))
                return res.redirect("/admin/login");
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
            if(!admin.includes(String(decoded.id)))
                return res.redirect("/admin/login");
            
            req.user = {
                ...decoded,
                accessToken: newAccessToken
            };
            return next();
        }
    } catch (error: any) {
        return res.redirect("/admin/login");
    }
    return res.redirect("/admin/login");
};


