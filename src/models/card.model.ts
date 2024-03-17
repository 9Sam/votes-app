import { Schema, model, models } from "mongoose";

const CardSchema = new Schema(
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

export default models.Card || model("Card", CardSchema);
