
import { Schema, model, InferSchemaType } from "mongoose";
import { ROLES } from '../enum/Role';

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  role:{
    type: String ,
    enum:ROLES,
    required: true,
    default:"customer"
  },
  password: {
    type: String,
    required: true,
  },
});

export type IUser = InferSchemaType<typeof userSchema>;

export const User = model("User", userSchema);
