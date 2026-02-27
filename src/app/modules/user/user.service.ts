import { IUser } from "./user.interface";
import { User } from "./user.model";

const createUser=async(payload:Partial<IUser>)=>{
     const { name, email, password, phone, picture, address, auths } = payload; // Added other fields based on IUser interface
    const user = await User.create({
      name,
      email,
      password, 
      phone,
      picture,
      address,
      auths 
    });
    return user;
}

//get all users
const getAllUsers=async()=>{
    const users=await User.find();
    return users
}

export const userService={
    createUser,
    getAllUsers
}