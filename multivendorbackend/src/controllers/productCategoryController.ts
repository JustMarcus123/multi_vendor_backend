
import { Response,Request } from "express";
// import type { AuthRequest } from "../middleware/authenticate";
import * as CategoryServices from "../services/Product.category.services"


export async function getProductCategory(req: Request, res: Response){

    const category = await CategoryServices.getCategory();
    res.json(category)

}