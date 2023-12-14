import dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
dotenv.config();
import jwt from 'jsonwebtoken';
import { LoginUserRequest } from '../interfaces/user';


export interface ExtendedUser extends Request{
    info?:LoginUserRequest
}

export const verifyToken = (req:ExtendedUser, res:Response, next:NextFunction)=>{

    try {
        const token = req.headers['token'] as string;

        if(!token){
            return res.status(404).json({
                message: "Permission set denies you access"
            })
        }
        const data = jwt.verify(token, process.env.KEY as string) as LoginUserRequest;
        req.info = data
        
    } catch (error) {
        res.json({
            message: error
        })
    }
    next();
}