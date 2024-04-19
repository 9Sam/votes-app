"use client";

import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";
import { notify } from "@/utils/utils";
import { errorText } from "@/components/utils/utils";
import { Button, Input } from "@nextui-org/react";
import { getInputPrimaryClasses } from "@/utils/nextui.custom";
import useSetTitle from "@/hooks/useSetTitle";
import { useState } from "react";
import Image from "next/image";

export default function ResetPassword() {
   const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm();

   useSetTitle("Request password reset");

   const handleOnSubmit = async (formatData: any) => {
      await fetch("/api/auth/recover", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(formatData),
      }).then((res) => {
         notify("An email with the restoration link has been sent", "success");
      });
   };

   return (
      <div className="flex justify-center align-middle w-full p-4">
         {!isSubmitted ? (
            <div className="mt-[160px]">
               <p className="p-4 text-center">
                  Please check your email for the restoration link. Thank you!
               </p>
               <div className="flex justify-center mt-10">
                  <Image
                     src={"/icon.svg"}
                     alt="logo"
                     width={100}
                     height={100}
                  />
               </div>
            </div>
         ) : (
            <form
               onSubmit={handleSubmit(handleOnSubmit)}
               className="w-full flex align-middle"
            >
               <div className="w-[500px] mx-auto mt-[160px] mt-md-[200px] my-auto">
                  <h1 className="text-2xl md:text-3xl mb-4 text-center">
                     Reset password request
                  </h1>

                  <Input
                     {...register("email", { required: true })}
                     className="my-4"
                     classNames={getInputPrimaryClasses()}
                     fullWidth
                     autoComplete="off"
                     color="primary"
                     size="md"
                     placeholder="Email"
                  />
                  {errors.email && errorText("Email is required")}
                  <p className="text-sm text-gray-500">
                     After your email is sent, you will receive an email with a
                     link to reset your password.
                  </p>
                  <div className="flex flex-col justify-center gap-4">
                     <Button
                        className="mx-auto mt-4"
                        variant="solid"
                        color="primary"
                        type="submit"
                     >
                        Reset password
                     </Button>
                  </div>
                  <ToastContainer />
               </div>
            </form>
         )}
      </div>
   );
}
