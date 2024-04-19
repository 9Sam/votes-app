import { NextResponse } from "next/server";
import AuthService from "@/services/authService/auth.service";
import { StatusE } from "@/utils/enums";

type ResetPasswordProps = {
   userId: string;
   token: string;
   password: string;
};

export async function POST(req: Request) {
   const { userId, token, password }: ResetPasswordProps = await req.json();

   try {
      const res = await AuthService.resetPassword(userId, token, password);

      return NextResponse.json({ status: StatusE.SUCCESS, message: res });
   } catch (error) {
      if (error instanceof Error) {
         return NextResponse.json({
            status: StatusE.ERROR,
            message: error.message,
         });
      }
   }
}
