import { VotationPoolI } from "../../../../interfaces/votes.interface";
import { Client } from "@notionhq/client";
import {
   mapToVotationCards,
   mapToVotationPools,
} from "../mappers/votationService.mapper";

const notionClient = new Client({
   auth: process.env.DB_SECRET,
});

const VotationsService = {
   async getVotationPoolsByUser(userId: string): Promise<VotationPoolI[]> {
      const res = (
         await notionClient.databases.query({
            database_id: process.env.DB_VOTATION_POOL || "",
            filter: {
               property: "createdBy",
               rich_text: {
                  contains: userId,
               },
            },
         })
      ).results as any;

      const votationPools = mapToVotationPools(res);

      return votationPools;
   },

   async getCardsByVotationPoolId(votationPoolId: string) {
      const res = (
         await notionClient.databases.query({
            database_id: process.env.DB_CARDS || "",
            filter: {
               property: "votationPoolId",
               rich_text: {
                  contains: votationPoolId,
               },
            },
         })
      ).results as any;

      // console.log(res);
      const cards = mapToVotationCards(res);
      // console.log(cards);
      return res;
   },
};

export default Object.freeze(VotationsService);
