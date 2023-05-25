import { useState, useEffect } from "react"

type AsyncDataOptions<T> = {
    delay?: number,
    dependecies?: any[],
    onFetch?: (data:T) => void,
}
const defaultOptions:AsyncDataOptions<unknown> = {
    delay: 0,
    dependecies: []
}

export type IUseAsyncDataReturn<T extends () => unknown> = ReturnType<typeof useAsyncData<Awaited<ReturnType<T>>>>



export default function useAsyncData<T>(
    func: () => Promise<T>,
    options?: AsyncDataOptions<T>
) {
    const { 
        delay, 
        dependecies,
        onFetch
    } = { ...defaultOptions, ...options }
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
                onFetch?.(result)
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