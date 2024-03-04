"use client";

import { useSelector } from "react-redux";
import { VotationPoolI } from "../interfaces/votes.interface";

type Props = {
   votationPools: VotationPoolI[];
};

export default function VotationPools({ votationPools }: Props) {
   return (
      <div>
         {votationPools &&
            votationPools.map((votationPool: VotationPoolI) => (
               <div key={votationPool.id}>
                  <h1>{votationPool.title}</h1>
                  <p>{votationPool.description}</p>
               </div>
            ))}
      </div>
   );
}
