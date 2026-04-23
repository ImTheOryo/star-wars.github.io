import * as React from "react";
import {type Starship, StarshipService} from "../services/StarshipService.ts";
import {createContext, useContext, useEffect, useState} from "react";

interface StarshipContextType {
    starships: Starship[];
    loading: boolean;
    count: number;
    search: (query: string, page: number) => void;
}

const StarshipContext = createContext<StarshipContextType | null>(null);

interface CharacterProviderProps {
    children?: React.ReactNode;
}

export function StarshipProvider({ children }: CharacterProviderProps) {
    const [starships, setStarships] = useState<Starship[]>([])
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(false);

    const service = new StarshipService();

    const search = async (query: string, page: number = 1) => {
        setLoading(true);

        let total = 0

        do {
            const data = await service.getAllStarships(query, page);

            setStarships((prev) => [...prev, ...(data?.results || [])]);
            setCount(data?.count ?? 0)
            total = data?.count ?? 0;
            page += 1;

        } while (page <= Math.ceil(total / 10));


        setLoading(false);
    };

    useEffect(() => { search("", 1); }, []);

    return (
        <StarshipContext.Provider value={{ starships, loading, search, count }}>
            {children}
        </StarshipContext.Provider>
    )
}

export function useStarship() {
    const context = useContext(StarshipContext);
    if (!context) throw new Error("useStarship must be used within StarshipContext");
    return context;
}