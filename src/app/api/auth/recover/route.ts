import { NextResponse } from "next/server";
import AuthService from "@/services/authService/auth.service";

export async function POST(req: Request) {
   const { email } = await req.json();

   try {
      const link = await AuthService.requestPasswordReset(email);

      return NextResponse.json({ link });
   } catch (error) {
      if (error instanceof Error) {
         console.error(error.message);
      }
      return NextResponse.error();
   }
}
