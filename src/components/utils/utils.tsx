import React from "react";
import { IoEyeOff, IoEye } from "react-icons/io5";

export const errorText = (message: string) => {
   return <p className="text-danger">{message}</p>;
};

export const getIconFromIsPasswordVisible = (password: boolean) => {
   return password ? (
      <IoEyeOff className="text-2xl text-gray-500 pointer-events-none" />
   ) : (
      <IoEye className="text-2xl text-gray-500 pointer-events-none" />
   );
};
