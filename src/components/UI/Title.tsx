import React, { useState } from "react";
import Skeleton from "./Skeleton";
import { AnimateOnView } from "../AnimateOnView";
type Props = {
  children: React.ReactNode;
  isActive?: boolean;
  hideUnderline?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;
export default function Title(props: Props) {
  // eslint-disable-next-line react/prop-types
  const { children, className, isActive, hideUnderline } = props;
  const [isHovering, setIsHovering] = useState(false)

  const shouldDisplayUnderline = hideUnderline 
  ? false :
  isActive 
  ? true 
  : isHovering
  return (
    <Skeleton beforeLoadOptions={{ width: "65%", height: 50 }} className="m-auto">
      <div
        onMouseOver={() => setIsHovering(true)}
        onMouseOut={() => setIsHovering(false)}
        {...props}
        className={`
        translate-y-1
        group w-full flex flex-col gap-1 items-center 
        text-center text-3xl uppercase tracking-wid font-extrabold
        cursor-default 
        ${className}
        `}
      >
        <div>{children}</div>
        <div className={`transition-all h-1 rounded bg-white ${shouldDisplayUnderline ? 'w-8' : 'w-0'}`} />
      </div>
    </Skeleton>
  );
}
