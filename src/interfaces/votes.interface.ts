export interface VotationCardI {
   id: string;
   title?: string;
   description: string;
   likes: string[];
   dislikes: string[];
   votationPoolId: string;
   createdBy: string;
   createdAt: Date;
}

export interface VotationPoolI {
   id: string;
   title: string;
   description: string;
   userId: string;
   cards: VotationCardI[];
   guests: string[];
   status: string;
   createdBy: string;
   createdAt: Date;
}
