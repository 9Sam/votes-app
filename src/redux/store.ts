import { configureStore } from "@reduxjs/toolkit";
import votationPool from "./slices/votationPool.slice";
import user from "./slices/user.slice";

export const store = configureStore({
   reducer: {
      votationPool,
      user,
   },
});
