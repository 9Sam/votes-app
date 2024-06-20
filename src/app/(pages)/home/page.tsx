"use client"

import useUnauthenticated from "@/hooks/useUnauthenticated";

function Home() {
   useUnauthenticated();

   return (
      <main className="flex flex-col items-center justify-between p-5 md:p-10 lg:24">
         {/* <VotationPools votationPools={data} /> */}
      </main>
   );
}

export default Home;