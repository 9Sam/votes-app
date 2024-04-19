import { Schema, models, model } from "mongoose";
import {
   VotesCardDocumentI,
   VotesCardModelI,
} from "../interfaces/votes.interface";

const VotesCardSchema: Schema<VotesCardDocumentI> = new Schema(
   {
      title: { type: String },
      description: { type: String },
      likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
      dislikes: [{ type: Schema.Types.ObjectId, ref: "User" }],
      votationPoolId: { type: String, required: true },
      createdBy: { type: String, required: true },
   },
   { timestamps: true }
);

export default models.VotesCard ||
   model<VotesCardDocumentI, VotesCardModelI>("VotesCard", VotesCardSchema);
