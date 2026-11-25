import mongoose, { Schema } from "mongoose";


export interface ICategory{
  name: string;
  slug: string;
  description?: string;
  isActive: boolean; 
}


const CategorySchema = new Schema<ICategory>({
    name:{
        type: String,
        required: true,
       unique:true,
       trim: true
       
    },
      slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    isActive: {
      type: Boolean,
      default: true,
    },

});

const Category = mongoose.model<ICategory>(
    "Category",
    CategorySchema,"category"
)

export default Category;