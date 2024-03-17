import { Schema, models, model } from "mongoose";
import {
   IVotesPool,
   IVotesPoolDocument,
   IVotesPoolModel,
} from "../interfaces/votes.interface";

const VotesPoolSchema: Schema<IVotesPoolDocument> = new Schema(
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

VotesPoolSchema.statics.buildVotesPool = (args: IVotesPool) => {
   return new VotesPool(args);
};

const VotesPool = model<IVotesPoolDocument, IVotesPoolModel>(
   "votesPool",
   VotesPoolSchema
);

export default VotesPool;
