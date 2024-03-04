import { NextResponse } from "next/server";
import googleService from "../backend/services/googleService/google.service";

export async function GET() {
   return NextResponse.json("success");
}
