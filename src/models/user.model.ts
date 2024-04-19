import { Schema, models, model } from "mongoose";
import { UserDocumentI, UserModelI } from "../interfaces/user.interface";

const UserSchema: Schema<UserDocumentI> = new Schema(
   {
      name: {
         type: String,
         required: [true, "Name is required"],
         minLength: [3, "fullname must be at least 3 characters"],
         maxLength: [20, "fullname must be at most 20 characters"],
      },
      email: {
         type: String,
         required: [true, "Email is required"],
         unique: true,
         match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Email is invalid",
         ],
      },
      password: { type: String, required: true, select: false },
      picture: {
         type: String,
      },
   },
   { timestamps: true }
);

export default models.User ||
   model<UserDocumentI, UserModelI>("User", UserSchema);
