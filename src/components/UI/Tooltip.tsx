import { Tooltip as TootipComp } from '@mantine/core';
import React, { createContext, useContext } from 'react';
type Props = {
    children?: React.ReactNode
} & React.ComponentProps<typeof TootipComp> 

const TooltipContext = createContext<TooltipContextProps | null>(null);

export default function Tooltip(props:Props) {
    const { children } = props
    const toolipOptions = useContext(TooltipContext);
    return (
        <TootipComp {...toolipOptions} {...props} > 
            {children}
        </TootipComp>
    )
}
type TooltipContextProps = {} & React.ComponentProps<typeof Tooltip>;

type SkeletonProviderProps = {
    contextProps: TooltipContextProps
    children: React.ReactNode
}
export function TooltipProvider(props:SkeletonProviderProps) {
    const { contextProps, children } = props
    return (
        <TooltipContext.Provider value={{...useContext(TooltipContext), ...contextProps }}>
            {children}
        </TooltipContext.Provider>
    )
}