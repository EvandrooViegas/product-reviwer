import { useState, useEffect } from "react"

type AsyncDataOptions = {
    delay?: number,
    dependecies?: any[]
}
const defaultOptions:AsyncDataOptions = {
    delay: 0,
    dependecies: []
}

export default function useAsyncData<T>(
    func: () => Promise<T>,
    options?: AsyncDataOptions
) {
    const { 
        delay, 
        dependecies
    } = { ...defaultOptions, ...options}
    const [data, setData] = useState<T | null>(null)
    const [error, setError] = useState<Error | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    useEffect(() => {
        let isMounted = true
        setIsLoading(true)
        const fetch = async () => {
            try {
                const result = await func()
                if (isMounted) setData(result)
            } catch (e:any) {
                if (isMounted) setError(e)
            } finally {
                if (isMounted) setIsLoading(false)
            }
        }

        const timeoutId = setTimeout(() => fetch(), delay)
        return () => {
            clearTimeout(timeoutId)
            isMounted = false
        }
    }, [...dependecies as []])

    return { data, error, isLoading, refetch: fetch }
}