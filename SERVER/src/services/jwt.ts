// jwtService.ts
import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';
import env from '@config/env';

const JWT_SECRET = env.JWT_SECRET;
const JWT_REFRESH_SECRET = env.JWT_REFRESH_SECRET;

export interface TokenPayload extends JwtPayload {
    id: number;
    name: string;
}
export class JwtService {
    // Access Token (short-lived)
    static async sign(payload: TokenPayload, options?: SignOptions): Promise<string> {
        return jwt.sign(payload, JWT_SECRET, {
            expiresIn: '1h',
            ...options,
        });
    }

    static async verify(token: string): Promise<TokenPayload> {
        return jwt.verify(token, JWT_SECRET) as TokenPayload;
    }

    static async decode(token: string): Promise<null | { [key: string]: any } | string> {
        return jwt.decode(token);
    }

    // Refresh Token (long-lived)
    static async signRefreshToken(payload: TokenPayload, options?: SignOptions): Promise<string> {
        return jwt.sign(payload, JWT_REFRESH_SECRET, {
            expiresIn: '7d',
            ...options,
        });
    }

    static async verifyRefreshToken(token: string): Promise<TokenPayload> {
        return jwt.verify(token, JWT_REFRESH_SECRET) as TokenPayload;
    }
}
