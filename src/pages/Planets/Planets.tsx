import { Link } from "react-router";
import PlanetCard from "../../components/Planets/PlanetCard.tsx";
import { useEffect, useState } from "react";
import Pagination from "../../components/Pagination.tsx";
import {usePlanets} from "../../contexts/PlanetContext.tsx";



function PlanetsPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const { planets, search, count } = usePlanets();

    const ITEMS_PER_PAGE = 10;

    useEffect(() => {
        setTotalPages(Math.ceil(count / ITEMS_PER_PAGE))
    }, [count]);

    const paginatedPlanets = planets.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Header section */}
            <div className="relative border-b border-yellow-500/20 overflow-hidden">
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        backgroundImage:
                            "radial-gradient(1px 1px at 60% 40%, rgba(255,255,255,0.25), transparent), radial-gradient(1px 1px at 20% 70%, rgba(255,255,255,0.2), transparent)",
                    }}
                />
                <div className="max-w-7xl mx-auto px-6 py-12">
                    <p className="text-yellow-600 text-[10px] font-mono tracking-[0.5em] uppercase mb-2">
                        Cartographie Stellaire
                    </p>
                    <h1 className="text-5xl font-black uppercase tracking-tight text-white">
                        Planètes
                        <span className="text-yellow-400">.</span>
                    </h1>
                    <div className="mt-3 flex items-center gap-3">
                        <div className="h-px w-16 bg-yellow-500" />
                        <span className="text-gray-500 text-xs font-mono">
                            {count} systèmes répertoriés
                        </span>
                    </div>
                    <div className="relative flex items-center">
                        <svg
                            className="absolute left-3.5 w-3.5 h-3.5 pointer-events-none"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="#a16207"
                            strokeWidth={2}
                        >
                            <circle cx="11" cy="11" r="8" />
                            <path strokeLinecap="round" d="M21 21l-4.35-4.35" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Rechercher une planète"
                            onChange={(e) => search(e.target.value)}
                            className="w-full bg-transparent border-b border-yellow-500/30 focus:border-yellow-500
                            text-white placeholder-gray-600
                            font-mono text-[13px] tracking-wider
                            py-2.5 pl-9 pr-3
                            outline-none transition-colors duration-200
                            "
                        />
                    </div>
                </div>
            </div>

            {/* Grid */}
            <div className="max-w-7xl mx-auto px-6 py-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {paginatedPlanets.map((planet) => (
                        <Link
                            key={planet.url}
                            to={`/planets/${planet.name}`}
                            className="block"
                        >
                            <PlanetCard
                                name={planet.name}
                                climate={planet.climate}
                                terrain={planet.terrain}
                                population={planet.population}
                            />
                        </Link>
                    ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        setCurrentPage={setCurrentPage}
                    />
                )}
            </div>
        </div>
    );
}

export default PlanetsPage;