import React from "react";
import clsx from "clsx";

export type AutomateCardProps = {
  title: string;
  description: string;
  image?: React.ReactNode;
};

const AutomateCard: React.FC<AutomateCardProps> = ({
  title,
  description,
  image,
}) => {
  return (
    <div className="bg-white rounded-2xl p-3 flex gap-6 items-stretch min-w-100 shadow-sm transition hover:shadow-lg cursor-pointer group">
      <div className="w-full h-full rounded-xl bg-gray-200 mb-4 flex items-center justify-center overflow-hidden">
        {image || <div className="w-full h-full" />}
      </div>
      <div className="">
        <h4 className="text-lg font-semibold! text-black mb-1">{title}</h4>
        <p className="text-black/70 text-xs flex-1">{description}</p>
        <div className="flex justify-end mt-2">
          <span className="text-black/60 group-hover:text-primary transition text-xl mr-4">
            ↗
          </span>
        </div>
      </div>
    </div>
  );
};

export default AutomateCard;
