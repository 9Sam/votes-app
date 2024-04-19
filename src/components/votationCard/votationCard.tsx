"use client";

import {
   Card,
   CardBody,
   CardFooter,
   Button,
   CardHeader,
} from "@nextui-org/react";
import {
   AiFillDelete,
   AiFillDislike,
   AiFillLike,
   AiFillLock,
   AiOutlineDislike,
   AiOutlineLike,
} from "react-icons/ai";
import { VotesCardI } from "../../interfaces/votes.interface";
import { IoAddOutline } from "react-icons/io5";
import TextArea from "./textarea";
import { useEffect, useRef, useState } from "react";
import { UserI } from "../../interfaces/user.interface";

type VotationCardProps = {
   className?: string;
   votationCard: VotesCardI;
   user?: UserI;
};

type VoteStatusT = {
   value: number;
   isActive: boolean;
};

export default function VotationCard({
   className,
   votationCard,
   user,
}: VotationCardProps) {
   const {
      title,
      description,
      createdBy,
      likes,
      dislikes,
      createdAt,
   } = votationCard;

   const titleRef = useRef<HTMLTextAreaElement>(null);
   const descriptionRef = useRef<HTMLTextAreaElement>(null);

   const [textTitle, setTextTitle] = useState<string>(title || "");
   const [textDescription, setTextDescription] = useState<string>(
      description || ""
   );
   const [isDescriptionActive, setIsDescriptionActive] = useState<boolean>(
      description.length > 0
   );
   const [isEditable, setIsEditable] = useState<boolean>(
      user?._id === createdBy
   );

   useEffect(() => {
      if (user?._id === createdBy) setIsEditable(true);
   }, []);

   const handleTitleChange = (newText: string) => {
      setTextTitle(newText);
   };

   const handleDescriptionChange = (newText: string) => {
      setTextDescription(newText);
   };

   const handleTextAreaBlur = () => {
      setIsDescriptionActive(textDescription.length > 0);
   };

   const handleAddDescription = () => {
      setIsDescriptionActive(true);

      if (descriptionRef.current) {
         descriptionRef.current.focus();
      }
   };

   // TODO: temp variable remove when API is ready
   const [upVote, setUpVote] = useState<VoteStatusT>({
      value: 1,
      isActive: true,
   });
   const [downVote, setDownVote] = useState<VoteStatusT>({
      value: 235,
      isActive: false,
   });

   const toggleVote = (vote: VoteStatusT) => {
      return {
         value: vote.isActive ? vote.value - 1 : vote.value + 1,
         isActive: !vote.isActive,
      };
   };

   const handleVote = (voteType: "upVote" | "downVote") => {
      if (voteType === "upVote") {
         setUpVote(toggleVote(upVote));

         if (downVote.isActive) {
            setDownVote(toggleVote(downVote));
         }
      }

      if (voteType === "downVote") {
         setDownVote(toggleVote(downVote));
         if (upVote.isActive) {
            setUpVote(toggleVote(upVote));
         }
      }
   };

   return (
      <Card className={`${className} w-full`} shadow="sm">
         <CardHeader className="icons flex gap-2 justify-end h-14">
            {isEditable ? (
               <Button variant="light" color="danger" size="sm">
                  <AiFillDelete className="icon-style" />
               </Button>
            ) : (
               <AiFillLock className="icon-style text-gray-500" />
            )}
         </CardHeader>
         <CardBody>
            <TextArea
               ref={titleRef}
               className="text-lg font-bold"
               value={textTitle || ""}
               setValue={setTextTitle}
               getState={handleTitleChange}
               readOnly={!isEditable}
            ></TextArea>
            {isDescriptionActive ? (
               <TextArea
                  ref={descriptionRef}
                  className="mt-2"
                  value={textDescription || ""}
                  setValue={setTextDescription}
                  getState={handleDescriptionChange}
                  onBlur={handleTextAreaBlur}
                  readOnly={!isEditable}
               ></TextArea>
            ) : isEditable ? (
               <Button
                  className="w-40 mt-2 "
                  variant="bordered"
                  size="md"
                  onClick={handleAddDescription}
               >
                  <div className="flex gap-2 text-gray-800">
                     <IoAddOutline className="w-5 h-5 " /> Add Description
                  </div>
               </Button>
            ) : null}
         </CardBody>
         <CardFooter>
            <div className="flex justify-between gap-2">
               <Button
                  className="w-auto min-w-16"
                  color="success"
                  variant="light"
                  aria-label="Take a photo"
                  onClick={() => handleVote("upVote")}
               >
                  {upVote.isActive ? (
                     <>
                        <AiFillLike className="icon-style" />
                        <span className="text-md">{upVote.value}</span>
                     </>
                  ) : (
                     <>
                        <AiOutlineLike className="icon-style" />
                        <span className="text-md">{upVote.value}</span>
                     </>
                  )}
               </Button>
               <Button
                  className="w-auto min-w-16"
                  color="danger"
                  variant="light"
                  aria-label="Take a photo"
                  onClick={() => handleVote("downVote")}
               >
                  {downVote.isActive ? (
                     <>
                        <AiFillDislike className="icon-style" />
                        <span className="text-md">{downVote.value}</span>
                     </>
                  ) : (
                     <>
                        <AiOutlineDislike className="icon-style" />
                        <span className="text-md">{downVote.value}</span>
                     </>
                  )}
               </Button>
            </div>
         </CardFooter>
      </Card>
   );
}
