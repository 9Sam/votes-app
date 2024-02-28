"use client";

import { Button, Card } from "@nextui-org/react";
import {
   VotationCardI,
   VotationPoolI,
} from "../app/interfaces/votes.interface";
import VotationCard from "./votationCard";
import { IoAddOutline } from "react-icons/io5";

type Props = {
   votationPool: VotationPoolI;
};

export default function VotationCardList({ votationPool }: Props) {
   return (
      <>
         <div className="w-full">
            <div>
               <h1 className="text-3xl mb-6">{votationPool.title}</h1>
               <p className="mb-6">{votationPool.description}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full ">
               {votationPool.cards &&
                  votationPool.cards.map((votationCard: VotationCardI) => (
                     <VotationCard
                        key={votationCard.id}
                        className="w-full"
                        votationCard={votationCard}
                     />
                  ))}
               <Button
                  className="group w-full h-full flex justify-center hover:bg-gray-50 cursor-pointer"
                  variant="bordered"
               >
                  <IoAddOutline className="mx-auto w-20 h-20 text-gray-300 group-hover:text-gray-400" />
               </Button>
            </div>
         </div>
      </>
   );
}
