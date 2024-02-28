import { configureStore } from "@reduxjs/toolkit";
import votationPool from "./slices/votationPool.slice";

export const store = configureStore({
   reducer: {
      votationPool,
   },
});
