import clsx from "clsx";
import React from "react";

interface ProgressBarProps {
  className?: string;
  progress: number;
}
export const ProgressBar = ({
  className = "h-[19px] overflow-hidden",
  progress = 0,
}: ProgressBarProps) => {
  return (
    <div className={clsx("border border-black/10 rounded-[3px] overflow-hidden", className)}>
      <div
        className=" bg-primary h-full"
        style={{ width: `${progress}%`, transition: "width 0.5s" }}
      />
    </div>
  );
};
