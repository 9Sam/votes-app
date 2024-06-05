import { Schema, models, model } from "mongoose";
import {
   VotesPoolDocumentI,
   VotesPoolModelI,
} from "../interfaces/votes.interface";

const VotesPoolSchema: Schema<VotesPoolDocumentI> = new Schema(
   {
      title: {
         type: String,
         required: true,
      },
      description: {
         type: String,
         required: true,
      },
      userId: {
         type: Schema.Types.ObjectId,
         ref: "User",
      },
      cards: [
         {
            type: Schema.Types.ObjectId,
            ref: "Card",
         },
      ],
      guests: [
         {
            type: Schema.Types.ObjectId,
            ref: "User",
         },
      ],
      status: {
         type: String,
         enum: ["open", "closed"],
         required: true,
      },
      createdBy: {
         type: String,
         required: true,
      },
   },
   { timestamps: true }
);

export default models.VotesPool ||
   model<VotesPoolDocumentI, VotesPoolModelI>("VotesPool", VotesPoolSchema);
