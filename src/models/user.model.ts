import { Schema, model } from "mongoose";
import { IUser, IUserDocument, IUserModel } from "../interfaces/user.interface";

const UserSchema: Schema<IUserDocument> = new Schema(
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

UserSchema.statics.buildUser = (args: IUser) => {
   return new User(args);
};

const User = model<IUserDocument, IUserModel>("users", UserSchema);

export default User;
