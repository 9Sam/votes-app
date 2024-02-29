"use client";

import { useSelector } from "react-redux";
import VotationCardList from "../../../components/votationCard/votationCardList";
import { VotationCardI } from "../../interfaces/votes.interface";

export default function Home({ params }: { params: { id: string } }) {
   const votationPools = useSelector((state: any) => state.votationPool);

   return (
      <main className="flex min-h-screen flex-col items-center justify-between p-5 md:p-10 lg:24">
         <VotationCardList
            votationPool={votationPools[params.id] || ([] as VotationCardI[])}
         />
      </main>
   );
}
