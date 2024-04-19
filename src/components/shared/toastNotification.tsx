type Props = {
   content: string;
};

export default function ToastNotification({ content }: Props) {
   return (
      <div className="w-[200px] absolute top-5 right-5 bg-success rounded-md">
         {content}
      </div>
   );
}
