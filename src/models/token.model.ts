import { Schema, model } from "mongoose";
import { ITokenDocument, ITokenModel } from "../interfaces/user.interface";

const TokenSchema: Schema<ITokenDocument> = new Schema({
   userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
   },
   token: {
      type: String,
      required: true,
   },
   createdAt: {
      type: Date,
      default: Date.now,
      expires: 3600,
   },
});

TokenSchema.statics.buildToken = (args: ITokenDocument) => {
   return new Token(args);
};

const Token = model<ITokenDocument, ITokenModel>("tokens", TokenSchema);

export default Token;
