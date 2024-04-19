import { NextResponse } from "next/server";
import UserService from "@/services/userService/user.service";
import { NextApiRequest } from "next";

export async function GET(req: Request) {
   const { searchParams } = new URL(req.url);
   const email = searchParams.get("email");

   const user = await UserService.getUser(email as string);

   if (user) {
      return NextResponse.json(user);
   } else {
      return NextResponse.json(null);
   }
}

export async function POST(req: Request) {
   const user = await req.json();

   try {
      await UserService.createUser(user);

      return NextResponse.json("success");
   } catch (error) {
      if (error instanceof Error) {
         console.error(error.message);
         return NextResponse.json(null);
      }
   }
}
