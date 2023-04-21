import { Skeleton as SkeletonComp } from "@mantine/core";
import React, { createContext, useContext } from "react";
type Props = {
  children?: React.ReactNode;
  beforeLoadOptions?: React.ComponentProps<typeof SkeletonComp>
} & React.ComponentProps<typeof SkeletonComp>;

const SkeletonContext = createContext<SkeletonContextProps | null>(null);

export default function Skeleton(props: Props) {
  const { children, beforeLoadOptions } = props;
  const contextOptions = useContext(SkeletonContext);
  return (
    <SkeletonComp
      {...contextOptions}
      {...props}
      {...(contextOptions?.visible ? beforeLoadOptions : {})}
    >
      {children}
    </SkeletonComp>
  );
}
type SkeletonContextProps = {} & React.ComponentProps<typeof Skeleton>;

type SkeletonProviderProps = {
  contextProps: SkeletonContextProps;
  children: React.ReactNode;
};
export function SkeletonProvider(props: SkeletonProviderProps) {
  const { contextProps, children } = props;
  return (
    <SkeletonContext.Provider
      value={{ ...useContext(SkeletonContext), ...contextProps }}
    >
      {children}
    </SkeletonContext.Provider>
  );
}
