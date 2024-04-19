import { UserI } from "@/interfaces/user.interface";
import User from "@/models/user.model";
import bcrypt from "bcrypt";
import dbConnect from "@/db/db";

class UserService {
   constructor() {
      dbConnect();
   }

   async getUser(email: string) {
      return await User.findOne({ email });
   }

   async getUserWithPassword(email: string) {
      return await User.findOne({ email }, "+password");
   }

   async createUser(user: UserI) {
      const existingUser = await User.findOne({ email: user.email });

      if (existingUser) {
         throw new Error("User already exists");
      }

      user.password = await bcrypt.hash(
         user.password,
         process.env.BCRYPT_SALT!
      );
      return await User.create(user);
   }
   
   async deleteUser(email: string) {
      return await User.deleteOne({ email });
   }
}

const userService = new UserService();

export default userService as UserService;
