import { Button } from "@nextui-org/react";
import { IoAddOutline } from "react-icons/io5";

export default function AddDescriptionButton() {
   return (
      <Button className="w-40" variant="bordered">
         <div>
            <IoAddOutline className="w-5 h-5 text-gray-800" />
         </div>
      </Button>
   );
}
