import {createContext, useContext, useEffect, useState} from "react";
import * as React from "react";
import {type Species, SpeciesService} from "../services/SpeciesService.ts";

interface SpeciesContextType {
    species: Species[];
    count: number;
    loading: boolean;
    search: (query: string, page: number) => void;
}

const SpecieContext = createContext<SpeciesContextType | null>(null);

interface CharacterProviderProps {
    children?: React.ReactNode;
}

export function SpeciesContextProvider({ children }: CharacterProviderProps) {
    const [species, setSpecies] = useState<Species[]>([]);
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(false);

    const service = new SpeciesService();

    const search = async (query: string, page: number = 1) => {
        setLoading(true);

        let total = 0

        do {
            const data = await service.getAllSpecies(query, page);

            setSpecies((prev) => [...prev, ...(data?.results || [])]);
            setCount(data?.count ?? 0)
            total = data?.count ?? 0;
            page += 1;

        } while (page <= Math.ceil(total / 10));


        setLoading(false);
    };

    useEffect(() => { search("", 1); }, []);

    return (
        <SpecieContext.Provider value={{ species, loading, search, count }}>
            {children}
        </SpecieContext.Provider>
    );

}

export function useSpecies() {
    const context = useContext(SpecieContext);
    if (!context) throw new Error('useCharacters doit être dans un SpeciesProvider');
    return context;
}