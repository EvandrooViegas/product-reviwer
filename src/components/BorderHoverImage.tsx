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
        "transition duration-200 border border-transparent border-dashed hover:p-0.5 hover:border-white/30 p-0.5",
        className
      )}
      {...rest}
    />
  );
}
