"use client"

import Spinner from "@/components/shared/spinner";
import { useSession } from "next-auth/react";
import { useRouter} from "next/navigation"



function Home() {
   const  {data: session, status} = useSession();
   const router = useRouter();

   if (status === "loading") {
      return <Spinner/>
    }
  
    if (status === "unauthenticated") {
      return router.push("/auth/login")
    }

   if(!session?.user === undefined){
      router.push("/auth/login")
   }

   return (
      <main className="flex flex-col items-center justify-between p-5 md:p-10 lg:24">
         {/* <VotationPools votationPools={data} /> */}
      </main>
   );
}

export default Home;