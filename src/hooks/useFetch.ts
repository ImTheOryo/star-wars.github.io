import { useState, useEffect } from "react";

export function useFetch<T>(url: string){
    const [data, setData] = useState<T | null >();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch(url, {
            method: "GET",
        })
            .then(response => response.json())
            .then((data) => setData(data))
            .catch(() => setData(null))
            .finally(() => setIsLoading(false));

        return () => {
            setIsLoading(true);
            setData(null);
        }
    }, [url])

    return {data, isLoading};
}