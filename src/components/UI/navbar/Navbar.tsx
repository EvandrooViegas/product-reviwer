type Props = {
    children: React.ReactNode,
    
} & React.HTMLAttributes<HTMLElement>

export default function Navbar(props:Props) {
    const { children } = props;
    return <nav {...props}>
        {children}
    </nav>
}