import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function useUnauthenticated() {
   const { data: session, status } = useSession();
   const router = useRouter();

   useEffect(() => {
      if (status === "unauthenticated") {
         console.log("User is not authenticated");
         router.push("/auth/login");
      } else {
         console.log("User is authenticated");
      }
   }, []);
}
