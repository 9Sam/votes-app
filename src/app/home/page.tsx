import VotationPools from "../../components/votationPools";

async function fetchData() {
   const response = await fetch(`${process.env.HOST}/api/votation`);

   return response.json();
}

export default async function Home() {
   const data = await fetchData();

   // console.log("votationresponse: ", data);

   return (
      <main className="flex min-h-screen flex-col items-center justify-between p-5 md:p-10 lg:24">
         {/* <VotationPools votationPools={data} /> */}
      </main>
   );
}
