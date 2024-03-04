import { createSlice } from "@reduxjs/toolkit";
import { UserI } from "../../interfaces/user.interface";

const initialState: UserI = {
   id: "3140b311-fb75-45e7-ac07-a463b18a8381",
   username: "sacasc9",
   profilePicture: "",
};

export const User = createSlice({
   name: "User",
   initialState,
   reducers: {},
});

export const {} = User.actions;
export default User.reducer;
