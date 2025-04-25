// types.d.ts
import { JwtPayload } from 'jsonwebtoken';
interface UserType{
  id:string;
  name:string;
  accessToken:string;
}
declare global {
  namespace Express {
    interface Request {
      user?: UserType | JwtPayload;
    }
  }
}
