import { User } from '../models/Users';
import bcrypt from "bcryptjs";
import httpError from "../utils/httpErrors";
import type { RegisterInput } from '../validators/authValidators';
import { Types } from 'mongoose';



interface PublicUser {
  id: string;
  name: string;
  email: string;
}

interface authUser{
    user: PublicUser
}

function publicUser(u: {
  _id: Types.ObjectId | string;
  name: string;
  email: string;
}): PublicUser {
  return {
    id: String(u._id),
    name: u.name,
    email: u.email,
  };
}


export async function register({
  name,
  email,
  password,
}: RegisterInput): Promise<authUser> {
  if (await User.exists({ email })) {
    throw new httpError(409, "Email already registered");
  }

  const passwordHash = await bcrypt.hash(password, 12);

  try {
    const user = await User.create({
      name,
      email,
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





