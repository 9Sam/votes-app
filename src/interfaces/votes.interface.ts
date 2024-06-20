import { Document, Model } from "mongoose";

export interface VotesCardI {
   _id?: any;
   title?: string;
   description: string;
   likes: string[];
   dislikes: string[];
   votationPoolId: string;
   createdBy: string;
   createdAt: Date;
}

export interface VotesPoolI {
   _id?: any;
   title: string;
   description: string;
   userId: string;
   cards: VotesCardI[];
   guests: string[];
   status: string;
   createdBy: string;
   createdAt: Date;
}

export interface VotesCardDocumentI extends VotesCardI, Document {}

export interface VotesPoolDocumentI extends VotesPoolI, Document {}

export interface VotesCardModelI extends Model<VotesCardDocumentI> {
   buildVotesCard(args: VotesCardI): VotesCardDocumentI;
}

export interface VotesPoolModelI extends Model<VotesPoolDocumentI> {
   buildVotesPool(args: VotesPoolI): VotesPoolDocumentI;
}
