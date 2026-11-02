import { RequestHandler } from "express";
import { ZodTypeAny } from "zod";
import httpError from "../utils/httpErrors";


export default function validate(schema: ZodTypeAny):RequestHandler{
    return(req, res, next)=>{

        const result = schema.safeParse(req.body);
        if(!result.success){
            const details = result.error.issues.map((i)=>({
                field: i.path.join('.'),
                message: i.message,
            }));

            return next(new httpError(400, "validation failed", details))
        }

        req.body = result.data;
        next();

    }
}