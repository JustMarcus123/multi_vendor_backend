import { User } from '../models/Users';
import bcrypt from "bcryptjs";
import httpError from "../utils/httpErrors";
import type { LoginInput, RegisterInput } from '../validators/authValidators';
import { Types } from 'mongoose';
import { email } from 'zod';



interface PublicUser {
  id: string;
  name: string;
  email: string;
  role:string
}

interface authUser{
    user: PublicUser
}


function publicUser(u: {
  _id: Types.ObjectId | string;
  name: string;
  email: string;
  role:string;
}): PublicUser {
  return {
    id: String(u._id),
    name: u.name,
    email: u.email,
    role: u.role
  };
}


export async function register({
  name,
  email,
  role,
  password,
}: RegisterInput): Promise<authUser> {
  if (await User.exists({ email })) {
    throw new httpError(409, "Email already registered");
  }

  const passwordHash = await bcrypt.hash(password, 12);

  
  try {
    // const selectedRoles = data.role ?? "customer"

    const user = await User.create({
      name,
      email,
      role: role??  "customer",
      password: passwordHash,
    });
    return {
      user: publicUser(user),
    };
  } catch (error) {
    if ((error as { code?: number }).code === 11000) {
      throw new httpError(409, "Email already exists");
    }
    throw error;
  }
}

export async function login({email,password}: LoginInput) :Promise<authUser>{

  const user = await(User.findOne({email}));

  if(!user){
    throw new httpError(402 ,"Invalid email or password");

  }

  //validate the entered password with the hashed password
  const isPasswordValid = await  bcrypt.compare(
    password,
    user.password
  )

  if(!isPasswordValid){
    throw new httpError(401, "incorrect email or password");
  }
  return{
    user: publicUser(user)
  }

}





