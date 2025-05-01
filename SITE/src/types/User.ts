export interface IUsers {
    id?: string;
    name:string;
    email:string;
    password:string;
    image?:string;
    created_at?:string;
    updated_at?:string;
}
export interface UserRespoce{
    message?:string;
    user?:IUsers|IUsers[];
    detail?:string;
}