import * as React from "react";
import {type Film, FilmService} from "../services/FilmService.ts";
import {createContext, useEffect, useState} from "react";

interface FilmContextType {
    films: Film[];
    count: number;
    loading: boolean;
}

const FilmContext = createContext<FilmContextType | null>(null);

interface FilmProviderProps {
    children: React.ReactNode;
}

export function FilmContextProvider({ children }: FilmProviderProps) {
    const [films, setFilms] = useState<Film[]>([]);
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(false);

    const service = new FilmService();

    const fetchFilms = async (query: string = "", page: number = 1) => {
      setLoading(true);
      const data = await service.getAllFilms(query, page);
      setFilms(data?.results ?? []);
      setCount(data?.count ?? 0);
      setLoading(false);
    };

    useEffect(() => {fetchFilms()}, [])

    return (
        <FilmContext.Provider value={{films, count, loading}}>
            {children}
        </FilmContext.Provider>
    )
}