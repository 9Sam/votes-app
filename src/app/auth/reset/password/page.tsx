"use client";

import { Button, Input } from "@nextui-org/react";
import { useRef, useState, Suspense } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";
import { useSearchParams } from "next/navigation";
import {
   errorText,
   getIconFromIsPasswordVisible,
} from "@/components/utils/utils";
import { notify } from "@/utils/utils";
import { StatusE } from "@/utils/enums";
import useSetTitle from "@/hooks/useSetTitle";

export default function ChangePasswordWithSuspense() {
   return <Suspense>
      <ChangePassword />
   </Suspense>
}

 function ChangePassword() {
   const params = useSearchParams();
   const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
   } = useForm();

   const token = params.get("token") || "default";
   const id = params.get("id") || "default";

   const password = useRef({});
   password.current = watch("password", "");

   const [isPassVisible, setIsPassVisible] = useState<boolean>(false);
   const [isConfPassVisible, setIsConfPassVisible] = useState<boolean>(false);

   useSetTitle("Reset Password");

   const handleOnSubmit = async (formData: any) => {
      await fetch("/api/auth/reset/password", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({
            userId: id,
            token,
            password: formData.password,
         }),
      }).then(async (res) => {
         const response = await res.json();
         if (response.status !== StatusE.SUCCESS) {
            notify("Invalid or expired request for password reset", "error");
         } else {
            notify("Password changed successfully", "success");
         }
      });
   };

   const toggleVisibility = (password: boolean) => {
      if (password) {
         setIsPassVisible(!isPassVisible);
      } else {
         setIsConfPassVisible(!isConfPassVisible);
      }
   };

   return (
      <div className="flex justify-center align-middle w-full p-4">
         <form
            onSubmit={handleSubmit(handleOnSubmit)}
            className="w-full flex align-middle"
         >
            <div className="w-[500px] mx-auto mt-[160px] mt-md-[200px] my-auto">
               <h1 className="text-2xl md:text-3xl mb-4 text-center">
                  Change password
               </h1>
               <Input
                  {...register("password", {
                     required: { value: true, message: "Password is required" },
                     minLength: { value: 6, message: "Password is too short" },
                     maxLength: {
                        value: 20,
                        message: "Password is too long",
                     },
                  })}
                  isRequired
                  type={isPassVisible ? "text" : "password"}
                  className="my-4"
                  fullWidth
                  color="primary"
                  size="md"
                  placeholder="Password"
                  autoComplete="new-password"
                  endContent={
                     <button
                        className="focus:outline-none"
                        type="button"
                        tabIndex={-1}
                        onClick={() => toggleVisibility(true)}
                     >
                        {getIconFromIsPasswordVisible(isPassVisible)}
                     </button>
                  }
               />
               {errors.password && errorText(errors.password.message as string)}
               <Input
                  {...register("confirmPassword", {
                     required: true,
                     validate: (value) =>
                        value === password.current ||
                        "The passwords do not match",
                  })}
                  type={isConfPassVisible ? "text" : "password"}
                  className="my-4"
                  fullWidth
                  color="primary"
                  size="md"
                  placeholder="Confirm password"
                  autoComplete="new-password"
                  endContent={
                     <button
                        className="focus:outline-none"
                        type="button"
                        onClick={() => toggleVisibility(false)}
                     >
                        {getIconFromIsPasswordVisible(isConfPassVisible)}
                     </button>
                  }
               />
               {errors.confirmPassword && (
                  <p className="text-danger">
                     {errors.confirmPassword.message as string}
                  </p>
               )}
               {errors.custom && errorText(errors.custom.message as string)}
               <p className="text-center text-sm text-gray-500 mt-4">
                  Please enter a new password.
               </p>
               <div className="flex flex-col justify-center gap-4">
                  <Button
                     className="mx-auto mt-4"
                     variant="solid"
                     color="primary"
                     type="submit"
                  >
                     Change password
                  </Button>
               </div>
               <ToastContainer />
            </div>
         </form>
      </div>
   );
}
