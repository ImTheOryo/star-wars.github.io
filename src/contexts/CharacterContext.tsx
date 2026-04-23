import {type Character, CharacterService} from "../services/CharacterService.ts";
import {createContext, useContext, useEffect, useState} from "react";
import * as React from "react";

interface CharacterContextType {
    characters: Character[];
    count: number;
    loading: boolean;
    search: (query: string, page: number) => void;
}

const CharacterContext = createContext<CharacterContextType | null>(null);

interface CharacterProviderProps {
    children?: React.ReactNode;
}

export function CharacterContextProvider({ children }: CharacterProviderProps) {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(false);

    const service = new CharacterService();

    const search = async (query: string, page: number = 1) => {
        setLoading(true);
        const data = await service.getAllCharacters(query, page);
        setCharacters(data?.results ?? []);
        setCount(data?.count ?? 0);
        setLoading(false);
    };

    useEffect(() => { search("", 1); }, []);

    return (
        <CharacterContext.Provider value={{ characters, loading, search, count }}>
            {children}
        </CharacterContext.Provider>
    );

}

export function useCharacters() {
    const context = useContext(CharacterContext);
    if (!context) throw new Error('useCharacters doit être dans un CharacterProvider');
    return context;
}