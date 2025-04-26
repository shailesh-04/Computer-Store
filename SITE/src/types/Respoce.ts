// @types/Respoce.ts
import { IComputers } from "./Computer";
import { IUsers } from "./User";
export interface UserRespoce{
    message?:string;
    user?:IUsers|IUsers[];
    detail?:string;
}
export interface ComputerRespoce{
    message?:string;
    computer?:IComputers|IComputers[];
    detail?:string;
}