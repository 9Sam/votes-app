import { createSlice } from "@reduxjs/toolkit";
import { VotationPoolI } from "../../app/interfaces/votes.interface";

const initialState: VotationPoolI[] = [
   {
      id: 1,
      title: "Votation Pool 1",
      description: "Votation Pool 1 description",
      userId: "3140b311-fb75-45e7-ac07-a463b18a83c8",
      cards: [
         {
            id: 1,
            title: "Card 1",
            userId: "3140b311-fb75-45e7-ac07-a463b18a8381",
            description: "This is the content of card 1",
            votes: {
               likes: 123,
               dislikes: 0,
            },
            creationDate: new Date(),
         },
         {
            id: 2,
            title: "Card 2",
            userId: "3140b311-fb75-45e7-ac07-a463b18a8382",
            description: "",
            votes: {
               likes: 425,
               dislikes: 0,
            },
            creationDate: new Date(),
         },
      ],
      creationDate: new Date(),
   },
   {
      id: 2,
      title: "Votation Pool 2",
      description: "Votation Pool 2 description",
      userId: "3140b311-fb75-45e7-ac07-a463b18a83c9",
      cards: [
         {
            id: 1,
            title: "Card 1",
            description: "This is the content of card 1",
            userId: "3140b311-fb75-45e7-ac07-a463b18a8391",
            votes: {
               likes: 0,
               dislikes: 0,
            },
            creationDate: new Date(),
         },
      ],
      creationDate: new Date(),
   },
];

export const VotationPool = createSlice({
   name: "VotationPool",
   initialState,
   reducers: {
      addVotationPool: (state, action) => {
         state.push(action.payload);
      },
      // removeVotationPool: (state, action) => {
      //    state.votationPool = state.votationPool.filter(
      //       (VotationPool) => VotationPool.id !== action.payload
      //    );
      // },
      // toggleVotationPool: (state, action) => {
      //    const VotationPool = state.votationPool.find(
      //       (VotationPool) => VotationPool.id === action.payload
      //    );
      // },
   },
});

export const { addVotationPool } = VotationPool.actions;
export default VotationPool.reducer;
