import { theme } from "@/config/theme";
import { ThreeCircles } from "react-loader-spinner";

function Spinner() {
   return (
      <div className="container mx-auto h-[calc(100vh-180px)] w-screen flex justify-center items-center">
         <ThreeCircles color={theme.primary} width={80} height={80} visible={true} wrapperClass="mx-auto" />
      </div>
   );
}

export default Spinner;
