import { Document, Model } from "mongoose";

export interface IUser {
   _id?: any;
   name: string;
   email: string;
   password: string;
   picture: string;
   createdAt?: Date;
}

export interface IToken {
   userId: IUser;
   token: string;
   createdAt: Date;
}

export interface IUserDocument extends IUser, Document {}

export interface IUserModel extends Model<IUserDocument> {
   buildUser(args: IUser): IUserDocument;
}

export interface ITokenDocument extends IToken, Document {}

export interface ITokenModel extends Model<ITokenDocument> {
   buildToken(args: IToken): ITokenDocument;
}
