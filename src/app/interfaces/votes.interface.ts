type VoteT = {
   likes: number;
   dislikes: number;
};

export interface VotationCardI {
   id: number;
   title?: string;
   userId: string;
   description: string;
   creationDate: Date;
   votes: VoteT;
}

export interface VotationPoolI {
   id: number;
   title: string;
   userId: string;
   description: string;
   cards: VotationCardI[];
   creationDate: Date;
}
