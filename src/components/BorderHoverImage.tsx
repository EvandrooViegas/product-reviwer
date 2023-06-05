import React from "react";
import { twMerge } from "tailwind-merge";

type Props =  React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>;
export default function BorderHoverImage(props: Props) {
  // eslint-disable-next-line react/prop-types
  const { className, ...rest } = props;
  return (
    <img
      className={twMerge(
        "transition-all duration-200 border border-transparent border-dashed  hover:border-white/30 group-hover:border-white/30 hover:p-0.5",
        className
      )}
      {...rest}
    />
  );
}
