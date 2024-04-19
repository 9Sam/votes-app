"use client"

import Spinner from "@/components/shared/spinner";
import withAuth from "@/components/withAuth";
import { useSession } from "next-auth/react";
import { useRouter} from "next/navigation"



function Home() {
   const  {data: session, status} = useSession();
   const router = useRouter();

   if (status === "loading") {
      return <Spinner/>
    }
  
    if (status === "unauthenticated") {
      return <p>Access Denied</p>
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