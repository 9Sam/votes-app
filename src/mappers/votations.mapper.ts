import {
   VotesCardI,
   VotesPoolI,
} from "../interfaces/votes.interface";
import {
   getDate,
   getRelations,
   getText,
   getTitle,
} from "../utils/notion.utils";

export const mapToVotationPools = (res: any): VotesPoolI[] => {
   const votationPools: VotesPoolI[] = res.map(
      ({ properties }: NotionResultT) => {
         const votationPool: VotesPoolI = {
            title: getTitle(properties.title),
            userId: getRelations(properties.userId)[0],
            status: getText(properties.status),
            createdBy: getText(properties.createdBy),
            cards: getRelations(properties.cards),
            guests: getRelations(properties.guests),
            description: getText(properties.description),
            createdAt: getDate(properties.createdAt),
         };

         return votationPool;
      }
   );

   return votationPools;
};

export const mapToVotationCards = (res: any): VotesCardI[] => {
   const cards: VotesCardI[] = res.map(
      ({ properties, id }: NotionResultT) => {
         const card: VotesCardI = {
            title: getTitle(properties.title),
            description: getText(properties.description),
            likes: getText(properties.likes).split(";"),
            dislikes: getText(properties.dislikes).split(";"),
            votationPoolId: getText(properties.votationPoolId)[0],
            createdBy: getText(properties.createdBy),
            createdAt: getDate(properties.createdAt),
         };

         return card;
      }
   );
   return cards;
};
