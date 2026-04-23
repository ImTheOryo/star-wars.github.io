interface FilmCardProps {
    title: string;
    episode: number;
    director?: string;
    year?: number;
}

const episodeTitles: Record<number, string> = {
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

function FilmCard({ title, episode, director, year }: FilmCardProps) {
    const subtitle = episodeTitles[episode] || "";
    const romanEpisode = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"][episode] || episode.toString();

    return (
        <div className="group relative bg-black/50 backdrop-blur-md overflow-hidden cursor-pointer transition-all duration-500
            border border-yellow-500/30 hover:border-yellow-400/80
            shadow-[0_0_20px_rgba(234,179,8,0.05)] hover:shadow-[0_0_50px_rgba(234,179,8,0.25)]">

            {/* Fond étoilé animé */}
            <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-700"
                 style={{
                     backgroundImage: 'radial-gradient(1px 1px at 10% 20%, white, transparent), radial-gradient(1px 1px at 80% 40%, white, transparent), radial-gradient(1px 1px at 30% 70%, white, transparent), radial-gradient(1px 1px at 60% 85%, white, transparent)',
                 }}
            />

            {/* Episode number — huge watermark */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[80px] font-black text-yellow-500/5 group-hover:text-yellow-500/10 transition-all duration-500 select-none font-mono leading-none">
                {romanEpisode}
            </div>

            {/* Top bar */}
            <div className="relative h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative p-6">
                {/* Episode badge */}
                <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center gap-1.5">
                        <div className="w-1 h-4 bg-yellow-500" />
                        <div className="w-0.5 h-3 bg-yellow-500/60" />
                        <div className="w-0.5 h-2 bg-yellow-500/30" />
                    </div>
                    <span className="text-[10px] font-black text-yellow-600 tracking-[0.5em] uppercase">
                        Épisode {romanEpisode}
                    </span>
                </div>

                {/* Title */}
                <h2 className="text-white text-2xl font-black uppercase italic tracking-tighter leading-tight group-hover:text-yellow-200 transition-colors duration-300 mb-1">
                    {title}
                </h2>

                {subtitle && (
                    <p className="text-yellow-600/80 text-sm font-medium italic mb-4">
                        {subtitle}
                    </p>
                )}

                {/* Meta info */}
                <div className="flex items-center gap-4 pt-3 border-t border-white/5">
                    {director && (
                        <div>
                            <p className="text-[9px] text-gray-600 uppercase tracking-[0.3em] mb-0.5">Réalisateur</p>
                            <p className="text-gray-400 text-xs font-medium">{director}</p>
                        </div>
                    )}
                    {year && (
                        <div>
                            <p className="text-[9px] text-gray-600 uppercase tracking-[0.3em] mb-0.5">Année</p>
                            <p className="text-gray-400 text-xs font-mono">{year}</p>
                        </div>
                    )}
                    <div className="ml-auto">
                        <div className="w-8 h-8 rounded-full border border-yellow-500/30 group-hover:border-yellow-500/70 flex items-center justify-center transition-all duration-300">
                            <svg className="w-3 h-3 text-yellow-500 translate-x-px" fill="currentColor" viewBox="0 0 20 20">
                                <title>Chevron vers la droite</title>
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom accent */}
            <div className="h-0.5 bg-gradient-to-r from-yellow-500/0 via-yellow-500/60 to-yellow-500/0 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
        </div>
    );
}

export default FilmCard;