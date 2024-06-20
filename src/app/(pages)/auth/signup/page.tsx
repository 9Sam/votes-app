"use client";

import {
   errorText,
   getIconFromIsPasswordVisible,
} from "@/components/utils/utils";
import GoogleButton from "@/components/shared/buttons/googleButton";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { Button, Input } from "@nextui-org/react";
import { useRef, useState } from "react";
import { ToastContainer } from "react-toastify";
import { signIn } from "next-auth/react";
import { notify } from "@/utils/utils";
import { getInputPrimaryClasses } from "@/utils/nextui.custom";

export default function SignUpPage() {
   const {
      register,
      handleSubmit,
      watch,
      setError,
      formState: { errors },
   } = useForm();
   const password = useRef({});
   password.current = watch("password", "");

   const [isPassVisible, setIsPassVisible] = useState<boolean>(false);
   const [isConfPassVisible, setIsConfPassVisible] = useState<boolean>(false);

   const toggleVisibility = (password: boolean) => {
      if (password) {
         setIsPassVisible(!isPassVisible);
      } else {
         setIsConfPassVisible(!isConfPassVisible);
      }
   };

   const handleOnSubmit = async (formData: any) => {
      const response = await fetch("/api/auth/signup", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(formData),
      });

      const { message } = await response.json();

      if (response.ok) {
         notify("User created successfully!", "success");

         setTimeout(async () => {
            await signIn("credentials", {
               email: formData.email,
               password: formData.password,
               callbackUrl: `${window.location.origin}/home`,
            });
         }, 3000);
      } else {
         setError("custom", { type: "manual", message });
      }
   };

   const handleOnGoogleSignUp = async () => {
      signIn("google", { callbackUrl: `${window.location.origin}/home` });
   };

   return (
      <div className="flex justify-center align-middle w-full p-4">
         <form
            onSubmit={handleSubmit(handleOnSubmit)}
            className="w-full flex align-middle"
         >
            <div className="w-[500px] mx-auto mt-[160px] mt-md-[200px] my-auto">
               <h1 className="text-2xl md:text-3xl mb-4 text-center">
                  Register
               </h1>
               <Input
                  {...register("name", { required: true })}
                  className="my-4"
                  classNames={getInputPrimaryClasses()}
                  fullWidth
                  color="primary"
                  size="md"
                  placeholder="Username"
               />
               {errors.name && errorText("A name is required")}
               <Input
                  {...register("email", { required: true })}
                  className="my-4"
                  fullWidth
                  color="primary"
                  size="md"
                  placeholder="Email"
               />
               {errors.email && errorText("Email is required")}
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
                  classNames={getInputPrimaryClasses()}
                  fullWidth
                  color="primary"
                  size="md"
                  placeholder="Password"
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
                  classNames={getInputPrimaryClasses()}
                  fullWidth
                  color="primary"
                  size="md"
                  placeholder="Confirm password"
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
               <div className="flex flex-col justify-center gap-4">
                  <Button
                     className="mx-auto mt-4"
                     variant="solid"
                     color="primary"
                     type="submit"
                  >
                     Sign up
                  </Button>
                  <span className="text-center">or</span>
                  <GoogleButton
                     onClick={handleOnGoogleSignUp}
                     text="Sign up with Google"
                  />
                  <Link
                     href={"/auth/login"}
                     className="text-center text-sm underline text-gray-500 mx-auto"
                  >
                     Already have an account
                  </Link>
               </div>
               <ToastContainer />
            </div>
         </form>
      </div>
   );
}
