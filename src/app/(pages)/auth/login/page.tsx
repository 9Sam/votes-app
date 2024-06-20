"use client";

import Link from "next/link";
import useSetTitle from "@/hooks/useSetTitle";
import GoogleButton from "@/components/shared/buttons/googleButton";
import { signIn, useSession } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { redirect } from "next/navigation";
import { ToastContainer } from "react-toastify";
import { Button, Input } from "@nextui-org/react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { errorText } from "@/components/utils/utils";
import Spinner from "@/components/shared/spinner";

export default function LoginPage() {
   const {
      register,
      handleSubmit,
      setError,
      formState: { errors },
   } = useForm();
   // const { data: session, status } = useSession();

   const [isPassVisible, setIsPassVisible] = useState<boolean>(false);

   // useSetTitle("Login");

   // if (status === "loading") {
   //    return <Spinner />;
   // }

   // if(session?.user){
   //    redirect("/home")
   // }


   const handleSignIn = async (data: any) => {
      const res = await signIn("credentials", {
         email: data.email,
         password: data.password,
         redirect: false,
      });

      if (res?.status === 200) {
         redirect("/home");
      }

      if (!res?.ok) {
         setError("root", { type: "manual", message: "Invalid credentials" });
      }
   };

   const handleGoogleSignIn = async () => {
      await signIn("google", {
         callbackUrl: "/home",
      });
   };

   const toggleVisibility = () => {
      setIsPassVisible(!isPassVisible);
   };

   const getIconFromIsPasswordVisible = (password: boolean) => {
      return password ? (
         <IoEyeOff className="text-2xl text-gray-500 pointer-events-none" />
      ) : (
         <IoEye className="text-2xl text-gray-500 pointer-events-none" />
      );
   };

   return (
      <div className="flex justify-center align-middle w-full p-4">
         <form
            onSubmit={handleSubmit(handleSignIn)}
            className="w-full flex align-middle"
         >
            <div className="w-[500px] mx-auto mt-[160px] mt-md-[200px] my-auto">
               <h1 className="text-2xl md:text-3xl mb-4 text-center">Login</h1>
               <Input
                  {...register("email", { required: true })}
                  className="my-4"
                  autoComplete="email"
                  fullWidth
                  color={errors.email ? "danger" : "primary"}
                  size="md"
                  placeholder="Email"
               />
               {errors.email && errorText("Email is required")}
               <Input
                  {...register("password", {
                     required: { value: true, message: "Password is required" },
                  })}
                  isRequired
                  type={isPassVisible ? "text" : "password"}
                  className="my-4"
                  fullWidth
                  color={errors.password ? "danger" : "primary"}
                  size="md"
                  placeholder="Password"
                  autoComplete="new-password"
                  endContent={
                     <button
                        className="focus:outline-none"
                        type="button"
                        tabIndex={-1}
                        onClick={() => toggleVisibility()}
                     >
                        {getIconFromIsPasswordVisible(isPassVisible)}
                     </button>
                  }
               />
               {errors.password && errorText(errors.password.message as string)}
               {errors.root && errorText(errors.root.message as string)}
               <div className="flex flex-col justify-center gap-4">
                  <Button
                     className="mx-auto mt-4"
                     variant="solid"
                     color="primary"
                     type="submit"
                  >
                     Log in
                  </Button>
                  <span className="text-center">or</span>
                  <GoogleButton
                     onClick={handleGoogleSignIn}
                     text="Login with Google"
                  />

                  <Link
                     href={"/auth/reset"}
                     className="text-center text-sm underline text-gray-500 mx-auto"
                  >
                     Forgot my password
                  </Link>
                  <Link
                     href={"/auth/signup"}
                     className="text-center text-sm underline text-gray-500 mx-auto"
                  >
                     Don't have an account?
                  </Link>
               </div>
               <ToastContainer />
            </div>
         </form>
      </div>
   );
}
