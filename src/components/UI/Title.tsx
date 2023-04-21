import React from 'react'
type Props = {
    children: React.ReactNode
} & React.HTMLAttributes<HTMLDivElement>
export default function Title(props:Props) {
    const  { children } = props
    return (
        <div {...props} className={`w-full col-span-2 flex gap-2 items-center text-3xl uppercase tracking-wide ${props.className}`}>
            <div className='text-gradient-secondary font-extrabold'>{children}</div>
            <div className='grow h-1 rounded bg-gradient-to-r from-blue-300 '></div>
        </div>
    )
}
