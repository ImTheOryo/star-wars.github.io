import { Link } from "react-router";
import CharacterCard from "../../components/CharacterCard.tsx";
import {useEffect, useState} from "react";
import Pagination from "../../components/Pagination.tsx";
import {useCharacters} from "../../contexts/CharacterContext.tsx";
import {usePlanets} from "../../contexts/PlanetContext.tsx";
import {useSpecies} from "../../contexts/SpecieContext.tsx";

function CharactersPage() {
    const { characters, search, count } = useCharacters();
    const { planets } = usePlanets();
    const { species } = useSpecies();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const ITEMS_PER_PAGE = 10;

    useEffect(() => {
        search("", currentPage)
    }, [currentPage]);

    useEffect(() => {
        setTotalPages(Math.ceil(count / ITEMS_PER_PAGE));
    }, [count]);

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Header section */}
            <div className="relative border-b border-yellow-500/20 overflow-hidden">
                <div className="absolute inset-0 pointer-events-none"
                     style={{ backgroundImage: 'radial-gradient(1px 1px at 40% 60%, rgba(255,255,255,0.2), transparent), radial-gradient(1px 1px at 80% 20%, rgba(255,255,255,0.15), transparent)' }} />
                <div className="max-w-7xl mx-auto px-6 py-12">
                    <p className="text-yellow-600 text-[10px] font-mono tracking-[0.5em] uppercase mb-2">Base de Données</p>
                    <h1 className="text-5xl font-black uppercase tracking-tight text-white">
                        Personnages
                        <span className="text-yellow-400">.</span>
                    </h1>
                    <div className="mt-3 flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <div className="h-px w-16 bg-yellow-500" />
                            <span className="text-gray-500 text-xs font-mono">{count} entrées</span>
                        </div>
                    </div>
                    <input
                        type="text"
                        placeholder="Rechercher un personnage"
                        onChange={(e) => search(e.target.value, 1)}
                        className="w-full bg-transparent border-b border-yellow-500/30 focus:border-yellow-500
                            text-white placeholder-gray-600
                            font-mono text-[13px] tracking-wider
                            py-2.5 pl-9 pr-3 mt-4
                            outline-none transition-colors duration-200
                            "
                    />
                </div>
            </div>

            {/* Grid */}
            <div className="max-w-7xl mx-auto px-6 py-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {characters.map((character) => (
                        <Link
                            key={character.url}
                            to={`/character/${character.name}`}
                            className="block"
                        >
                            <CharacterCard
                                name={character.name}
                                species={species.find(specie => character.species?.includes(specie.url || ""))?.name}
                                homeworld={planets.find(planet => planet.url == character.homeworld)?.name}
                                gender={character.gender}
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

export default CharactersPage;