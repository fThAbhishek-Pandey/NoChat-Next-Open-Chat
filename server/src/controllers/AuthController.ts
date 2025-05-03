import { Request, Response } from "express";
import prisma from "../config/db.config.js";
import jwt from 'jsonwebtoken'
interface loginPayLoadType {
    name:string;
    email:string;
    provider:string;
    oauth_id:string;
    image?:string;
}
class AuthController {
    static async login (request:Request, response:Response){
        try {
            const body:loginPayLoadType = request.body
            let findUser= await prisma.user.findUnique({
                where:{
                    email:body.email
                }
            })
            if(!findUser){
                findUser = await prisma.user.create({data:body})
            }
            let JWTPayload = {
                name:body.name,
                email:body.email,
                id:findUser.id
            }
            const token= jwt.sign(JWTPayload, process.env.JWT_SECKRET, {expiresIn:'6d'})
            return response.json({message:'login Successfuly', user:{
                ...findUser, token:`Bearer ${token}`
            }})
        } catch (error) {
           return response.status(500).json({message:"something went wrong!"})   
        }
    }
}
export default AuthController