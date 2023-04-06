import React from 'react'

type Props = {
    children: React.ReactNode
} & React.HTMLAttributes<HTMLDivElement>
export default function Item(props:Props) {
  const { children } = props
  return (
    <div {...props}>
        {children}
    </div>
  )
}
