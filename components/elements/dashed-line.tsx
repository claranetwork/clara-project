import React from 'react';

interface DashedLineProps {
  dashLength?: number;
  dashSpacing?: number;
  strokeWidth?: number;
  color?: string;
  className?: string;
}

export const DashedLine: React.FC<DashedLineProps> = ({
  dashLength = 5,
  dashSpacing = 5,
  strokeWidth = 2,
  color = 'currentColor',
  className = '',
}) => {
  return (
    <svg
      className={`w-full h-auto ${className} text-foreground/60`}
      preserveAspectRatio="none"
      viewBox="0 0 100 1"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <line
        x1="0"
        y1="0.5"
        x2="100"
        y2="0.5"
        vectorEffect="non-scaling-stroke"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeDasharray={`${dashLength} ${dashSpacing}`}
      />
    </svg>
  );
};


