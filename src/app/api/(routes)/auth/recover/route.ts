import AuthService from "@/app/api/_services/authService/auth.service";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
   const { email } = await req.json();

   try {
      const link = await AuthService.requestPasswordReset(email);

      return NextResponse.json({ link });
   } catch (error) {
      if (error instanceof Error) {
         throw new Error(error.message);
      }
      return NextResponse.error();
   }
}
