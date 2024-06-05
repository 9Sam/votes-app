"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import {
   Navbar,
   NavbarBrand,
   NavbarContent,
   NavbarItem,
   Button,
} from "@nextui-org/react";

export default function NavbarCustom() {
   const { data: session } = useSession();

   return (
      <Navbar position="static">
         <NavbarBrand>
            <div className="flex align-middle">
               <Image
                  className="my-auto"
                  priority={true} 
                  src={"/icon.svg"}
                  alt="logo"
                  width="0"
                  height="0"
                  sizes="100vw"
                  style={{ width: '30px', height: 'auto' }}
               />
               <span className="font-bold text-inherit my-auto ms-3">VOTE</span>
            </div>
         </NavbarBrand>
         {session?.user ? (
            <>
               <NavbarContent className="hidden sm:flex gap-4" justify="center">
                  <NavbarItem>
                     <Link color="foreground" href="#">
                        Features
                     </Link>
                  </NavbarItem>
                  <NavbarItem isActive>
                     <Link href="#" aria-current="page">
                        Customers
                     </Link>
                  </NavbarItem>
                  <NavbarItem>
                     <Link color="foreground" href="#">
                        Integrations
                     </Link>
                  </NavbarItem>
               </NavbarContent>
               <NavbarContent justify="end">
                  <NavbarItem>
                     <Button
                        variant="solid"
                        color="danger"
                        onClick={() => signOut()}
                     >
                        Log Out
                     </Button>
                  </NavbarItem>
               </NavbarContent>
            </>
         ) : (
            <NavbarContent justify="end">
               <NavbarItem className="hidden lg:flex">
                  <Link href="/auth/login">Login</Link>
               </NavbarItem>
               <NavbarItem>
                  <Button
                     as={Link}
                     color="primary"
                     href="/auth/signup"
                     variant="flat"
                  >
                     Sign Up
                  </Button>
               </NavbarItem>
            </NavbarContent>
         )}
      </Navbar>
   );
}
