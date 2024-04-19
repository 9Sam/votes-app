import { Client } from "@notionhq/client";

export const notionClient = new Client({
   auth: process.env.NOTION_SECRET,
});

const NotionService = {
   findOne: async (id: string) => {
      return await notionClient.databases.retrieve({ database_id: id });
   },
};

export default Object.freeze(NotionService);
