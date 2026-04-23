import FilmCard from "../../components/Films/FilmCard.tsx";
import {useCallback, useEffect, useState} from "react";
import {Link} from "react-router";

interface FilmProps {
    title: string;
    episode_id: number;
    director: string;
    release_date: number;
    url: string;
}

function FilmsPage() {
    const [allFilms, setAllFilms] = useState<FilmProps[]>([]);
    const [currentFilter, setCurrentFilter] = useState<"nerd" | "casual">("casual");


    const sortAllFilms = useCallback (() => {
        const sortBy: keyof FilmProps = currentFilter === "casual" ? "episode_id" : "release_date";
        return [...allFilms].sort((a, b) => {
            const valueA = a[sortBy];
            const valueB = b[sortBy];

            if (valueA < valueB) return -1;
            if (valueA > valueB) return 1;
            return 0;
        });
    }, [allFilms, currentFilter]);

    const fetchAllFilms = useCallback(async () => {
        try {
            const response = await fetch("https://swapi.dev/api/films");
            if (response.ok) {
                const data = await response.json();
                setAllFilms(data.results);
            }
        } catch (error) {
            console.error("Fetch error:", error);
        }
    }, []);

    useEffect(() => {
        fetchAllFilms();
    },[fetchAllFilms]);

    const sortedFilms: FilmProps[] = sortAllFilms();

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Header section */}
            <div className="relative border-b border-yellow-500/20 overflow-hidden">
                <div className="absolute inset-0 pointer-events-none"
                     style={{ backgroundImage: 'radial-gradient(1px 1px at 20% 50%, rgba(255,255,255,0.3), transparent), radial-gradient(1px 1px at 70% 30%, rgba(255,255,255,0.2), transparent)' }} />
                <div className="max-w-7xl mx-auto px-6 py-12">
                    <p className="text-yellow-600 text-[10px] font-mono tracking-[0.5em] uppercase mb-2">Archives de la Galaxie</p>
                    <h1 className="text-5xl font-black uppercase tracking-tight text-white">
                        Films
                        <span className="text-yellow-400">.</span>
                    </h1>
                    <div className="mt-3 flex items-center gap-3">
                        <div className="h-px w-16 bg-yellow-500" />
                        <span className="text-gray-500 text-xs font-mono">{allFilms.length} entrées</span>
                    </div>
                    <button
                        className="mt-4 px-4 py-2 border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black transition-colors"
                        onClick={() => setCurrentFilter(prev => prev === "casual" ? "nerd" : "casual")}
                    >
                        Ordre: {currentFilter === "casual" ? "Épisodes" : "Date de sortie"}
                    </button>
                </div>
            </div>

            {/* Grid */}
            <div className="max-w-7xl mx-auto px-6 py-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {sortedFilms.map((film) => (
                        <Link
                            to={`/film/${film.url.split("/").reverse()[1]}`}
                            key={film.episode_id}
                            className="block"
                        >
                            <FilmCard
                                title={film.title}
                                episode={film.episode_id}
                                director={film.director}
                                year={film.release_date}
                            />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default FilmsPage;