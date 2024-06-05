"use client";

import NavbarCustom from "@/components/shared/navbarCustom";
import { Spinner } from "@nextui-org/react";
import { useSession } from "next-auth/react";

type Props = {
   children: React.ReactNode;
};

function App({ children }: Props) {
   const { status } = useSession();

   if (status === "loading") {
      return (
         <div className="flex justify-center items-center h-screen">
            <Spinner />
         </div>
      );
   }

   return (
      <div>
         <NavbarCustom />
         {children}
      </div>
   );
}

export default App;
