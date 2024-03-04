import {
   VotationCardI,
   VotationPoolI,
} from "../../../../interfaces/votes.interface";
import {
   getDate,
   getRelations,
   getText,
   getTitle,
} from "../../../../utils/utils";

export const mapToVotationPools = (res: any): VotationPoolI[] => {
   const votationPools: VotationPoolI[] = res.map(
      ({ properties }: NotionResultT) => {
         const votationPool: VotationPoolI = {
            id: getText(properties.id),
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

export const mapToVotationCards = (res: any): VotationCardI[] => {
   const cards: VotationCardI[] = res.map(
      ({ properties, id }: NotionResultT) => {
         const card: VotationCardI = {
            id: getText(properties.id),
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
