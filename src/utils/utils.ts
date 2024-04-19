import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const notify = (message: String, type: "error" | "success") =>
   type === "error"
      ? toast.error(message, {
           className: "mt-14",
           position: "top-center",
           progress: "false",
        })
      : toast.success(message, {
           className: "mt-14",
           position: "top-center",
           progress: "false",
        });

export const setTitle = (title: string) => {
   document.title = title;
};
