import Category from "../models/Category";


export async function getCategory(){

const productCategory = await Category.find({isActive: true}).sort({name:1}).lean();

 return productCategory;

}