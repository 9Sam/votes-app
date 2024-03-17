import { Document, Model } from "mongoose";
import { IUser } from "./user.interface";

export interface IVotesCard {
   title?: string;
   description: string;
   likes: string[];
   dislikes: string[];
   votationPoolId: string;
   createdBy: string;
   createdAt: Date;
}

export interface IVotesPool {
   title: string;
   description: string;
   userId: IUser;
   cards: IVotesCard[];
   guests: string[];
   status: string;
   createdBy: string;
   createdAt: Date;
}

export interface IVotesCardDocument extends IVotesCard, Document {}

export interface IVotesPoolDocument extends IVotesPool, Document {}

export interface IVotesCardModel extends Model<IVotesCardDocument> {
   buildVotesCard(args: IVotesCard): IVotesCardDocument;
}

export interface IVotesPoolModel extends Model<IVotesPoolDocument> {
   buildVotesPool(args: IVotesPool): IVotesPoolDocument;
}
