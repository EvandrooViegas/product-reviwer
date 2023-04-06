import React, { cloneElement } from 'react'
import SkeletonComp from 'react-loading-skeleton'

type Props = {
    renderwhen: any,
    children?: JSX.Element | React.ReactNode,
    width?: string,
    height?: string,
    rounded?: boolean,
    skeletonStyle?: React.CSSProperties,
    skeletonOptions?: React.ComponentProps<typeof SkeletonComp>
} & React.HTMLAttributes<HTMLDivElement>

 
export default function Skeleton(props:Props) {
    const { 
        renderwhen,
        children,
        width,
        rounded,
        height = width,
        skeletonStyle,
        skeletonOptions,
    } = props
    const isNullish = renderwhen === undefined || renderwhen === null 

    const isElement = (node:any):node is JSX.Element => {
        return node && 'className' in node
    }
    if(isNullish) return null
    const childrenClassName:string = (function(){
        if(isElement(children)) return children?.props?.className 
        return "" 
    }())
    return (
        <div 
         {...props} 
         className={`leading-[0px] ${props.className}`}
        >
            {childrenClassName}
            {renderwhen  
             ? children || null
             : (
                <SkeletonComp 
                 width={width} 
                 height={height} 
                 style={skeletonStyle}
                 className={`h-full  ${rounded && 'rounded-full'} ${childrenClassName}`} 
                 {...skeletonOptions}
                />
             )
            }
        </div>
    )
}
