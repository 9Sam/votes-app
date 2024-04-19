"use client";

import { VotesPoolI } from "../interfaces/votes.interface";

type Props = {
   votationPools: VotesPoolI[];
};

export default function VotationPools({ votationPools }: Props) {
   return (
      <div>
         {votationPools &&
            votationPools.map((votationPool: VotesPoolI) => (
               <div key={votationPool._id}>
                  <h1>{votationPool.title}</h1>
                  <p>{votationPool.description}</p>
               </div>
            ))}
      </div>
   );
}
