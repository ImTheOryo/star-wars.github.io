import {Link, useParams} from "react-router";
import {useFetch} from "../../hooks/useFetch.ts";
import type {Film} from "../../services/FilmService.ts";

import StatBlock from "../../components/Film/StatBlock.tsx";
import CountBadge from "../../components/Film/CountBadge.tsx";
import {usePlanets} from "../../contexts/PlanetContext.tsx";
import {useSpecies} from "../../contexts/SpecieContext.tsx";
import {useStarship} from "../../contexts/StarshipContext.tsx";
import {useVehicle} from "../../contexts/VehicleContext.tsx";
import {useCharacters} from "../../contexts/CharacterContext.tsx";
import type {Planets} from "../../services/PlanetService.ts";
import type {Species} from "../../services/SpeciesService.ts";
import type {Starship} from "../../services/StarshipService.ts";
import type {Vehicle} from "../../services/VehicleService.ts";
import type {Character} from "../../services/CharacterService.ts";
import {FaRegShareFromSquare} from "react-icons/fa6";

const ROMAN = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"];

const EPISODE_SUBTITLES: Record<number, string> = {
    1: "La Menace Fantôme",
    2: "L'Attaque des Clones",
    3: "La Revanche des Sith",
    4: "Un Nouvel Espoir",
    5: "L'Empire contre-attaque",
    6: "Le Retour du Jedi",
    7: "Le Réveil de la Force",
    8: "Les Derniers Jedi",
    9: "L'Ascension de Skywalker",
};

function FilmDetailPage (){
    const {filmId} = useParams();
    const {data, isLoading} = useFetch<Film>(`https://swapi.dev/api/films/${filmId}`);
    const {characters} = useCharacters();
    const {planets} = usePlanets();
    const {species} = useSpecies();
    const {starships} = useStarship();
    const {vehicles} = useVehicle();


    const roman = data ? (ROMAN[data?.episode_id] ?? data?.episode_id) : "";
    const subtitle = data ? (EPISODE_SUBTITLES[data?.episode_id] ?? "") : "";
    const releaseYear = data ? new Date(data?.release_date).getFullYear() : null;

    if (isLoading || !data) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="relative w-48 h-0.5 bg-yellow-500/20 overflow-hidden">
                        <div className="absolute inset-y-0 left-0 w-1/3 bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.8)] animate-[loading_1.5s_ease-in-out_infinite]" />
                    </div>
                    <span className="text-[9px] font-mono text-yellow-700 tracking-[0.5em] uppercase animate-pulse">
                        Transmission en cours...
                    </span>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white relative overflow-hidden">

            {/* Ambient glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-64 bg-yellow-500/5 rounded-full blur-3xl pointer-events-none" />

            {/* ── HERO ── */}
            <div className="relative border-b border-yellow-500/20">
                {/* Episode watermark */}
                <div
                    className="absolute right-8 top-1/2 -translate-y-1/2 font-black text-yellow-500/5 select-none leading-none font-mono"
                    style={{ fontSize: "clamp(80px, 20vw, 160px)" }}
                >
                    {roman}
                </div>

                {/* Top accent line */}
                <div className="h-px bg-linear-to-r from-transparent via-yellow-500 to-transparent" />

                <div className="relative max-w-5xl mx-auto px-6 py-14">
                    {/* Episode label */}
                    <div className="flex items-center gap-3 mb-5">
                        <div className="flex items-center gap-1">
                            <div className="w-0.5 h-5 bg-yellow-500" />
                            <div className="w-0.5 h-3.5 bg-yellow-500/60" />
                            <div className="w-0.5 h-2 bg-yellow-500/30" />
                        </div>
                        <span className="text-[10px] font-black font-mono text-yellow-600 tracking-[0.5em] uppercase">
                            Épisode {roman}
                        </span>
                        {releaseYear && (
                            <>
                                <span className="text-yellow-800">·</span>
                                <span className="text-[10px] font-mono text-yellow-800 tracking-widest">{releaseYear}</span>
                            </>
                        )}
                    </div>

                    {/* Title */}
                    <h1
                        className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter text-white leading-none mb-2"
                        style={{ textShadow: "0 0 60px rgba(234,179,8,0.2)" }}
                    >
                        {data?.title}
                    </h1>

                    {subtitle && (
                        <p className="text-yellow-600/70 text-lg font-medium italic mb-8">{subtitle}</p>
                    )}

                    {/* Key stats row */}
                    <article className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8">
                        <StatBlock label="Réalisateur" value={data?.director} />
                        <StatBlock label="Producteur" value={data?.producer.split(",")[0].trim()} />
                        <StatBlock label="Sortie" value={data?.release_date} />
                        <StatBlock label="Épisode" value={roman.toString()} />
                    </article>
                </div>
            </div>

            {/* ── CONTENT ── */}
            <div className="relative max-w-5xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Opening crawl — main column */}
                <div className="lg:col-span-2 space-y-8">

                    {/* Crawl section */}
                    <div>
                        <div className="flex items-center gap-3 mb-5">
                            <span className="text-[10px] font-mono text-yellow-700 tracking-[0.5em] uppercase">Ouverture</span>
                            <div className="h-px flex-1 bg-yellow-500/20" />
                        </div>

                        {/* Star Wars crawl style */}
                        <div
                            className="relative bg-black/60 border border-yellow-500/20 p-6 overflow-hidden"
                            style={{ clipPath: "polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))" }}
                        >
                            {/* Scanlines */}
                            <div
                                className="absolute inset-0 pointer-events-none opacity-[0.03]"
                                style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,1) 3px, rgba(255,255,255,1) 4px)" }}
                            />

                            {/* Quote mark decoration */}
                            <div className="text-6xl font-black text-yellow-500/10 leading-none mb-2 select-none">"</div>

                            <p className="relative text-yellow-100/70 leading-relaxed text-sm font-medium uppercase italic tracking-wide whitespace-pre-line">
                                {data?.opening_crawl}
                            </p>

                            {/* Bottom accent */}
                            <div className="mt-4 flex items-center gap-2">
                                <div className="h-px w-8 bg-yellow-500/40" />
                                <span className="text-[9px] font-mono text-yellow-700 tracking-widest uppercase">Fin de transmission</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar — stats */}
                <div className="space-y-6">

                    {/* data? inventory */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <span className="text-[10px] font-mono text-yellow-700 tracking-[0.5em] uppercase">Inventaire</span>
                            <div className="h-px flex-1 bg-yellow-500/20" />
                        </div>

                        <div className="bg-black/40 border border-yellow-500/20 px-4 py-2">
                            <CountBadge <Character>
                                label="Personnages"
                                count={data?.characters.length}
                                elements={characters.filter((character) => data?.characters.includes(character.url))}
                                renderItem={(c) => (
                                    <Link
                                        to={`/personnage/${c.url.split("/").reverse()[1]}`}
                                        className="flex justify-between group items-center"
                                    >
                                        <span>{c.name}</span>
                                        <FaRegShareFromSquare className="opacity-0 group-hover:opacity-100 text-yellow-400"/>
                                    </Link>
                                )}
                            />

                            <CountBadge <Planets>
                                label="Planètes"
                                count={data?.planets.length}
                                elements={planets.filter((planet) => data?.planets.includes(planet.url))}
                                renderItem={(p) => (
                                    <Link to={"/"}
                                        className="flex justify-between group items-center"
                                    >
                                        <span>{p.name}</span>
                                        <FaRegShareFromSquare className="opacity-0 group-hover:opacity-100 text-yellow-400"/>
                                    </Link>
                                )}
                            />

                            <CountBadge <Starship>
                                label="Vaisseaux"
                                count={data?.starships.length}
                                elements={starships.filter((starship) => data?.starships.includes(starship.url))}
                                renderItem={(s) => (
                                    <Link
                                        to={"/"}
                                        className="flex justify-between group items-center"
                                    >
                                        <span>{s.name}</span>
                                        <FaRegShareFromSquare className="opacity-0 group-hover:opacity-100 text-yellow-400"/>
                                    </Link>
                                )}
                            />

                            <CountBadge <Vehicle>
                                label="Véhicules"
                                count={data?.vehicles.length}
                                elements={vehicles.filter((vehicle) => data?.vehicles.includes(vehicle.url))}
                                renderItem={(v) => (
                                    <Link
                                        to={"/"}
                                        className="flex justify-between group items-center"
                                    >
                                        <span>{v.name}</span>
                                        <FaRegShareFromSquare className="opacity-0 group-hover:opacity-100 text-yellow-400"/>
                                    </Link>
                                )}
                            />

                            <CountBadge <Species>
                                label="Espèces"
                                count={data?.species.length}
                                elements={species.filter((specie) => data?.species.includes(specie.url))}
                                renderItem={(s) => (
                                    <Link
                                        to={"/"}
                                        className="flex justify-between group items-center"
                                    >
                                        <span>{s.name}</span>
                                        <FaRegShareFromSquare className="opacity-0 group-hover:opacity-100 text-yellow-400"/>
                                    </Link>
                                )}
                            />
                        </div>
                    </div>

                    {/* Production details */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <span className="text-[10px] font-mono text-yellow-700 tracking-[0.5em] uppercase">Production</span>
                            <div className="h-px flex-1 bg-yellow-500/20" />
                        </div>

                        <div className="space-y-2">
                            <StatBlock label="Réalisateur" value={data?.director} />
                            {data?.producer.split(",").map((p, i) => (
                                <StatBlock key={i} label={i === 0 ? "Producteur(s)" : ""} value={p.trim()} />
                            ))}
                        </div>
                    </div>

                    {/* Timestamps */}
                    <div className="border border-yellow-500/10 p-4 bg-black/20">
                        <p className="text-[9px] font-mono text-yellow-800 tracking-[0.3em] uppercase mb-3">Métadonnées</p>
                        <div className="space-y-2">
                            <div>
                                <p className="text-[8px] font-mono text-gray-600 uppercase tracking-widest">Créé</p>
                                <p className="text-[10px] font-mono text-gray-500">{new Date(data?.created).toLocaleDateString("fr-FR")}</p>
                            </div>
                            <div>
                                <p className="text-[8px] font-mono text-gray-600 uppercase tracking-widest">Modifié</p>
                                <p className="text-[10px] font-mono text-gray-500">{new Date(data?.edited).toLocaleDateString("fr-FR")}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FilmDetailPage;