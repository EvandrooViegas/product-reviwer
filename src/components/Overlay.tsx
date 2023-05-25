import React from "react";
type Props = {
  children: React.ReactNode | React.ReactNode[] | null | undefined;
  isResetStyles?: boolean;
  isResetPosition?: boolean;
  isShowBackground?: boolean;
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;
export default function Overlay(props: Props) {
  const {
    // eslint-disable-next-line react/prop-types
    className,
    children,
    isResetPosition = true,
    isResetStyles = false,
    isShowBackground = true,
    ...rest
  } = props;
  if (!children) return null;
  return (
    <div
      className={
        isResetStyles
          ? className
          : ` 
            px-4 py-1 rounded text-xs w-fit
            ${isResetPosition ? "" : "absolute top-6 right-6 "} 
            ${
              isShowBackground
                ? `bg-primary`
                : `border border-dashed border-primary bg-black/40`
            }  
            ${className}`
      }
      {...rest}
    >
      {children}
    </div>
  );
}
