import React, { useState } from "react";
import Skeleton from "./Skeleton";
import { twMerge } from "tailwind-merge"

type Props = {
  children: React.ReactNode;
  isActive?: boolean;
  hideUnderline?: boolean;
  textClassName?: string;
} & React.HTMLAttributes<HTMLDivElement>;
export default function Title(props: Props) {
  // eslint-disable-next-line react/prop-types
  const { children, className, textClassName, isActive, hideUnderline } = props;
  const [isHovering, setIsHovering] = useState(false)

  const shouldDisplayUnderline = hideUnderline 
  ? false :
  isActive 
  ? true 
  : isHovering
  return (
    <Skeleton beforeLoadOptions={{ width: "65%", height: 50 }}>
      <div
        onMouseOver={() => setIsHovering(true)}
        onMouseOut={() => setIsHovering(false)}
        {...props}
        className={twMerge(`
        translate-y-1 my-1.5
        group w-full flex flex-col gap-1 items-center text-center
        text-3xl uppercase tracking-wid font-extrabold
        cursor-default 
        `, className)}
      >
        <p className={textClassName}>{children}</p>
        <div className={`transition-all h-1 rounded bg-white ${shouldDisplayUnderline ? 'w-8' : 'w-0'}`} />
      </div>
    </Skeleton>
  );
}
