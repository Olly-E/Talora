import React from 'react'
import clsx from 'clsx'

interface FullPageLoaderProps {
  bgColor?: string
  height?: string
  className?: string
}

export const FullPageLoader: React.FC<FullPageLoaderProps> = ({
  bgColor = 'none',
  height = 'h-screen',
  className = '',
}) => {
  return (
    <div
      className={clsx(
        'inset-0 flex items-center justify-center',
        bgColor,
        height,
        className,
      )}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        style={{
          background: 'none',
          display: 'block',
          shapeRendering: 'auto',
          margin: 'auto',
        }}
        width="80px"
        height="80px"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
      >
        <circle
          cx="50"
          cy="50"
          fill="none"
          stroke="#F7E001"
          strokeWidth="4"
          r="35"
          strokeDasharray="164.93361431346415 56.97787143782138"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            repeatCount="indefinite"
            dur="1s"
            values="0 50 50;360 50 50"
            keyTimes="0;1"
          ></animateTransform>
        </circle>
      </svg>
    </div>
  )
}
