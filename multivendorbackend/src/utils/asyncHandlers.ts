import { NextFunction, RequestHandler,Request, Response } from "express";



export default function asyncHandler<T extends Request = Request>(
    fn: (req: T, res: Response, next: NextFunction)=>Promise<unknown>
): RequestHandler{
    return (req,res,next)=>{
        Promise.resolve(fn(req as T, res, next)).catch(next);
    };
}