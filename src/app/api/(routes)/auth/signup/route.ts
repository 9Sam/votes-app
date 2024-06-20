import { NextResponse } from "next/server";
import User from "@/models/user.model";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
   const { name, email, password, picture = "" } = await request.json();

   if (!password || password.length < 6) {
      return NextResponse.json(
         { message: "Password must be at least 6 characters" },
         {
            status: 400,
         }
      );
   }

   try {
      const userFound = await User.findOne({ email });

      if (userFound) {
         return NextResponse.json(
            { message: "User already exists" },
            {
               status: 400,
            }
         );
      }

      const passwordHash = await bcrypt.hash(password, 10);

      const user = await User.create({
         name,
         email,
         password: passwordHash,
         picture,
      });

      console.log(name, email, password, picture);

      return NextResponse.json(user);
   } catch (error) {
      if (error instanceof Error) {
         return NextResponse.json(
            { message: error.message },
            {
               status: 400,
            }
         );
      }
   }
}
