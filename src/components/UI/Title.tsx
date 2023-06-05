import React, { useState } from "react";
import Skeleton from "./Skeleton";
import { twMerge } from "tailwind-merge"

type Props = {
  children: React.ReactNode;
  isActive?: boolean;
  hideUnderline?: boolean;
  textClassName?: string;
  fancy?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;
export default function Title(props: Props) {
  // eslint-disable-next-line react/prop-types
  const { children, className, textClassName, isActive, hideUnderline, fancy = false } = props;
  const [isHovering, setIsHovering] = useState(false)

  const shouldDisplayUnderline = hideUnderline 
  ? false :
  isActive 
  ? true 
  : isHovering
  return (
      <div
        onMouseOver={() => setIsHovering(true)}
        onMouseOut={() => setIsHovering(false)}
        {...props}
        className={twMerge(`
        translate-y-1 
        group w-full flex flex-col gap-1 items-center text-center
        text-3xl uppercase tracking-wid font-extrabold
        cursor-default ${fancy ? 'text-gradient-secondary' : ''} 
        `, className)}
      >
        <p className={textClassName}>{children}</p>
        <div className={`transition-all h-1 rounded  ${fancy ? '' : 'bg-white'}  ${shouldDisplayUnderline ? 'w-8' : 'w-0' }`} />
      </div>
  );
}
