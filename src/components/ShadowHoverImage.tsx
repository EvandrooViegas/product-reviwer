import React from "react";
import { twMerge } from "tailwind-merge";

type Props =  React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>;
export default function ShadowHoverImage(props: Props) {
  // eslint-disable-next-line react/prop-types
  const { className, ...rest } = props;
  return (
    <img
      className={twMerge(
        " transition duration-200 hover:shadow-2xl hover:shadow-primary/20 group-hover:shadow-primary/20",
        className
      )}
      {...rest}
    />
  );
}
