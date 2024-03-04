import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import NotionService from "../backend/services/notion.service";

type ResponseData = {
   message: string;
};

export async function GET() {
   const database = await NotionService.getDatabase();
   const user: any = await NotionService.getUser();
   const votationPools: any = await NotionService.getVotationPools();

   return NextResponse.json({ database, user, votationPools });
}
