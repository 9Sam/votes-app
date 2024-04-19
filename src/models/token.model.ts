import { Schema, models, model } from "mongoose";
import { TokenDocumentI, TokenModelI } from "../interfaces/user.interface";

const TokenSchema: Schema<TokenDocumentI> = new Schema({
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

export default models.Token ||
   model<TokenDocumentI, TokenModelI>("Token", TokenSchema);
