import { Button } from "@nextui-org/react";
import { FcGoogle } from "react-icons/fc";

type Props = {
   onClick: () => void;
   text: string;
};

export default function GoogleButton({ onClick, text }: Props) {
   return (
      <Button
         className="w-full h-auto flex justify-normal p-3"
         type="button"
         variant="bordered"
         onClick={onClick}
      >
         <div className="mx-auto flex gap-4">
            <FcGoogle className="icon-style" />
            {text}
         </div>
      </Button>
   );
}
