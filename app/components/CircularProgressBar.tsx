import React from "react";

interface CircularProgressBarProps {
  size: number;
  progress: number;
  strokeWidth?: number;
  trackColor?: string;
  progressColor?: string;
  textColor?: string;
  transitionDuration?: string;
  showText?: boolean;
}

const CircularProgressBar: React.FC<CircularProgressBarProps> = ({
  size,
  progress,
  strokeWidth = 10,
  trackColor = "#e6e6e6",
  progressColor = "#4caf50",
  textColor = "#333",
  transitionDuration = "5s",
  showText = false,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progressOffset = circumference - (progress / 100) * circumference;

  return (
    <div
      className=""
      style={{ position: "relative", width: size, height: size }}
    >
      <svg width={size} height={size}>
        {/* Background Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={trackColor}
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={progressColor}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={progressOffset}
          strokeLinecap="round"
          style={{
            transform: `rotate(-90deg)`,
            transformOrigin: "50% 50%",
            transition: `stroke-dashoffset ${transitionDuration} ease-in-out`,
          }}
        />
      </svg>
      {showText && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: size * 0.2,
            color: textColor,
            fontWeight: "bold",
          }}
        >
          {Math.round(progress)}%
        </div>
      )}
    </div>
  );
};

export default CircularProgressBar;
