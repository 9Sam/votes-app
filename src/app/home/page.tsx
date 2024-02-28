"use client";

import NavbarCustom from "../../components/navbarCustom";
import NoteCardList from "../../components/votationCardList";
import VotationPools from "../../components/votationPools";

export default function Home() {
   return (
      <main className="flex min-h-screen flex-col items-center justify-between p-5 md:p-10 lg:24">
         <VotationPools />
      </main>
   );
}
