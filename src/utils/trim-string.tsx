type TrimStringOptions = {
    start: number,
    end: number,
    decorator: string
}

const defaultTrimStringOptions:TrimStringOptions = {
    start: 0,
    end: 200,
    decorator: "..."
}
export default function trimString(
    str: string, 
    options?: Partial<TrimStringOptions> 
) {
    
    const { start, end, decorator } = {...defaultTrimStringOptions, ...options}
    const trimmedString = str.slice(start, end) 
    const decoratedString = str.length > end ? trimmedString + decorator : trimmedString
    return decoratedString
}