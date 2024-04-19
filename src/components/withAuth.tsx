"use client"

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function withAuth(WrappedComponent: any) {
   return (props: any) => {
      const { data: session } = useSession();

      useEffect(() => {
         if(!session){
            redirect("/auth/login");
         }
      }, [])

      // if(!session){
      //    return null;
      // }

      return <WrappedComponent {...props} />
   }
}