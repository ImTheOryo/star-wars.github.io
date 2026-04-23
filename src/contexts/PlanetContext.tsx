import {type Planets, PlanetService} from "../services/PlanetService.ts";
import {createContext, useContext, useEffect, useState} from "react";
import * as React from "react";


interface PlanetContextType {
    planets: Planets[];
    count: number;
    loading: boolean;
    search: (query: string) => void;
}

const PlanetContext = createContext<PlanetContextType | null>(null);

interface PlanetProviderProps {
    children?: React.ReactNode;
}


export function PlanetContextProvider({ children }: PlanetProviderProps) {
    const [planets, setPlanets] = useState<Planets[]>([]);
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(false);

    const service = new PlanetService();

    const search = async (query: string) => {
        setLoading(true);

        let page = 1
        let total = 0

        do {
            const data = await service.getAllPlanets(query, page);

            setPlanets((prev) => [...prev, ...(data?.results || [])]);
            setCount(data?.count ?? 0)
            total = data?.count ?? 0;
            page += 1;

        } while (page <= Math.ceil(total / 10));


        setLoading(false);
    };

    useEffect(() => { search(''); }, []);

    return (
        <PlanetContext.Provider value={{ planets, loading, search, count }}>
            {children}
        </PlanetContext.Provider>
    );

}

export function usePlanets() {
    const context = useContext(PlanetContext);
    if (!context) throw new Error('usePlanets doit être dans un PlanetProvider');
    return context;
}