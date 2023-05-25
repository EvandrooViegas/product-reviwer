import React from 'react'

type Props = {
    condition: boolean,
    children: React.ReactNode | React.ReactNode[] 

}
export default function ShowIf(props:Props) {
    const { condition: shouldRender, children } = props
    if(!shouldRender) return null
  return <>
    {children}
  </>
  
}
