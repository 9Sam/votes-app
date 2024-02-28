import { useSelector } from "react-redux";
import { VotationPoolI } from "../app/interfaces/votes.interface";

export default function VotationPools() {
   const votationPools = useSelector((state: any) => state.votationPool);

   return (
      <div>
         {votationPools.map((votationPool: VotationPoolI) => (
            <div key={votationPool.id}>
               <h1>{votationPool.title}</h1>
               <p>{votationPool.description}</p>
            </div>
         ))}
      </div>
   );
}
