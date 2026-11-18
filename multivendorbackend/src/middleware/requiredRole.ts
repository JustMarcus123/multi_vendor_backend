import { Response, NextFunction } from "express";
import { AuthRequest } from "./authenticate";
import { User } from "../models/Users";

export function requiredRole(...allowRoles: string[]){

    return async(req:AuthRequest, res:Response, next: NextFunction)=>{
        try {
          const  user = await User.findById(req.auth!.userId).select("role");
          if(!user){
            res.status(401).json({ message: "User no longer exists" });
        return;
          }

          if(!allowRoles.includes(user.role)){
              res.status(403).json({ message: "You do not have permission to do this" });
        return;
          }

          next();

        } catch (error) {
             next(error);
        }
    }

}