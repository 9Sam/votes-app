import { Document, Model } from "mongoose";

export interface UserI {
   _id?: any;
   name: string;
   email: string;
   password: string;
   picture: string;
   image?: string;
   createdAt?: Date;
}

export interface TokenI {
   userId: UserI;
   token: string;
   createdAt: Date;
}

export interface UserDocumentI extends UserI, Document {}

export interface UserModelI extends Model<UserDocumentI> {
   buildUser(args: UserI): UserDocumentI;
}

export interface TokenDocumentI extends TokenI, Document {}

export interface TokenModelI extends Model<TokenDocumentI> {
   buildToken(args: TokenI): TokenDocumentI;
}
