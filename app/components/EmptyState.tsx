import Image, { StaticImageData } from "next/image";
import React from "react";

interface EmptyStateProp {
  description: string;
  image: StaticImageData;
}
const EmptyState = ({ description, image }: EmptyStateProp) => {
  return (
    <div className="flex items-center justify-center w-full bg-white-3 h-[calc(100vh-282px)] mt-4 rounded-[15px]">
      <div className="flex flex-col gap-4 items-center justify-center">
        <Image src={image} alt="empty-state" className="max-w-[199px] h-auto" />
        <p className="mx-auto w-[405px] text-center">{description}</p>
      </div>
    </div>
  );
};

export default EmptyState;
