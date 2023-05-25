import { AnimateOnViewProps } from "..";
import React, { createContext } from "react"

export type IAnimateOnViewContext = Omit<AnimateOnViewProps, "children"> 
//context
export const AnimateOnViewContext = createContext(
  {} as IAnimateOnViewContext
);

export const AnimateOnViewProvider = (
  props: {
    children: React.ReactNode;
    containerClassName: string
  } & AnimateOnViewProps
) => {
  const { children, containerClassName,  ...rest } = props;
  return (
    <AnimateOnViewContext.Provider value={rest}>
      <div className={containerClassName}>
        {children}
      </div>
    </AnimateOnViewContext.Provider>
  );
};
