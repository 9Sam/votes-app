import { NextResponse } from "next/server";
import googleService from "../../../services/googleService/google.service";

export async function GET() {
   return NextResponse.json("success");
}
