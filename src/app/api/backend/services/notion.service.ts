import { Client } from "@notionhq/client";

const notionClient = new Client({
   auth: process.env.DB_SECRET,
});

const NotionService = {
   getDatabase: async () => {
      const res = await notionClient.databases.retrieve({
         database_id: process.env.DB_USERS || "",
      });
      console.log(res);
      return res;
   },

   getVotationPools: async (): Promise<NotionResultT[]> => {
      const res = await notionClient.databases.query({
         database_id: process.env.DB_VOTATION_POOL || "",
         filter: {
            property: "createdBy",
            rich_text: {
               contains: "5e59f4dc-0d75-4c06-9679-8b8c34458ac6",
            },
         },
      });

      return res.results as NotionResultT[];
   },

   getUser: async () => {
      const user = notionClient.databases.query({
         database_id: process.env.DB_USERS || "",
      });

      return (await user).results[0];
   },
};

export default Object.freeze(NotionService);
