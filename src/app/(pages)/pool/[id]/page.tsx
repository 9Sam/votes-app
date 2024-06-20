"use client";

import useUnauthenticated from "@/hooks/useUnauthenticated";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import VotationCardList from "@/components/votationCard/votationCardList";
import { VotesPoolI } from "@/interfaces/votes.interface";

type HomeProps = {
   params: { id: string };
};

export default function Pool({ params }: HomeProps) {
   useUnauthenticated();
   
   // const { data: session, status } = useSession();
   // const router = useRouter();

   // if (status === "unauthenticated") {
   //    console.log("User is not authenticated");
   //    router.push("/auth/login")
   // }else{
   //    console.log("User is authenticated");
   // }
   // const votationPools = useSelector((state: any) => state.votationPool);
   const votationPools: VotesPoolI[] = [
      {
         _id: "1",
         title: "Test",
         description: "Test",
         createdAt: new Date(),
         createdBy: "Test",
         guests: ["Test"],
         cards: [
            {
               _id: "1",
               title: "Test",
               description: "Test",
               createdAt: new Date(),
               createdBy: "Test",
               likes: ["Test"],
               dislikes: ["Test"],
               votationPoolId: "1",
            }
         ],
         status: "Test",
         userId: "1"
         },
      ]

   return (
      <main className="flex min-h-screen flex-col items-center justify-between p-5 md:p-10 lg:24">
         <VotationCardList
            votationPool={votationPools[0] || ([] as VotesPoolI[])}
         />
      </main>
   );
}
