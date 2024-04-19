"use client"

import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

import { useAuth } from "../providers/auth.provider";

type Props = {
   protectedRoutes: string[];
   children: React.ReactNode;
};

export default function PrivateRoute({ protectedRoutes, children }: Props) {
   const router = useRouter();
   const pathname = usePathname();
   const { isAuthenticated, isLoading } = useAuth();

   const pathIsProtected = protectedRoutes.indexOf(pathname) !== -1;

   useEffect(() => {
      if (!isLoading && !isAuthenticated && pathIsProtected) {
         // Redirect route, you can point this to /login
         router.push("/");
      }
   }, [isLoading, isAuthenticated, pathIsProtected]);

   if ((isLoading || !isAuthenticated) && pathIsProtected) {
      return <div>Temp loader</div>;
   }

   return children;
}
