"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
const AuthContext = createContext({} as any);

function AuthProvider({ children }: any) {
   const { data: session } = useSession();
   const [isAuthenticated, setIsAuthenticated] = useState(false);
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
      if (session) {
         setIsAuthenticated(true);
         setIsLoading(false);
      }else{
         setIsAuthenticated(false);
         setIsLoading(false);
      }
   }, []);

   return (
      <AuthContext.Provider
         value={
            {
               isAuthenticated,
               isLoading,
            } as any
         }
      >
         {children}
      </AuthContext.Provider>
   );
}

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
