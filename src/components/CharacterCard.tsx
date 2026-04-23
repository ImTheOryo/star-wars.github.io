
interface CharacterCardProps {
    name: string;
    species?: string;
    homeworld?: string;
    gender: "male" | "female" | "unknown" | "n/a" | "hermaphrodite" | "none";
}

function CharacterCard({ name, species, homeworld, gender = "unknown" }: CharacterCardProps) {
    const sideColors = {
        "male": { border: "border-blue-400", glow: "shadow-[0_0_20px_rgba(96,165,250,0.3)] hover:shadow-[0_0_40px_rgba(96,165,250,0.6)]", text: "text-blue-400", dot: "bg-blue-400", label: "HOMME" },
        "female": { border: "border-pink-600", glow: "shadow-[0_0_20px_rgba(220,38,38,0.3)] hover:shadow-[0_0_40px_rgba(220,38,38,0.6)]", text: "text-pink-500", dot: "bg-pink-500", label: "FEMME" },
        "unknown": { border: "border-yellow-500/40", glow: "shadow-[0_0_15px_rgba(234,179,8,0.1)] hover:shadow-[0_0_30px_rgba(234,179,8,0.4)]", text: "text-yellow-500", dot: "bg-yellow-500", label: "INCONNU" },
        "n/a": { border: "border-yellow-500/40", glow: "shadow-[0_0_15px_rgba(234,179,8,0.1)] hover:shadow-[0_0_30px_rgba(234,179,8,0.4)]", text: "text-yellow-500", dot: "bg-yellow-500", label: "INCONNU" },
        "none": { border: "border-yellow-500/40", glow: "shadow-[0_0_15px_rgba(234,179,8,0.1)] hover:shadow-[0_0_30px_rgba(234,179,8,0.4)]", text: "text-yellow-500", dot: "bg-yellow-500", label: "INCONNU" },
        "hermaphrodite": { border: "border-linear-gradient-to-r from-pink-500 to-blue-400", glow: "shadow-[0_0_20px_rgba(192,132,252,0.3)] hover:shadow-[0_0_40px_rgba(192,132,252,0.6)]", text: "text-purple-400", dot: "bg-gradient-to-r from-pink-500 to-blue-400", label: "HERMAPHRODITE" },
    };
    const colors = sideColors[gender];

    return (
        <div className={`group relative bg-black/60 backdrop-blur-sm p-5 border ${colors.border} ${colors.glow} transition-all duration-500 cursor-pointer overflow-hidden`}>
            {/* Scanline effect */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
                 style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,1) 2px, rgba(255,255,255,1) 4px)' }} />

            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-yellow-500" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-yellow-500" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-yellow-500" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-yellow-500" />

            {/* Holographic avatar placeholder */}
            <div className={`relative w-16 h-16 mx-auto mb-4 rounded-full border-2 ${colors.border} flex items-center justify-center bg-black/80`}>
                <span className={`text-2xl font-black ${colors.text}`}>{name.charAt(0)}</span>
                <div className={`absolute inset-0 rounded-full ${colors.dot} opacity-10 group-hover:opacity-20 transition-opacity duration-500`} />
            </div>

            {/* Status dot */}
            <div className="flex items-center justify-center gap-2 mb-3">
                <div className={`w-1.5 h-1.5 rounded-full ${colors.dot} animate-pulse`} />
                <span className={`text-[10px] font-black tracking-[0.4em] ${colors.text} uppercase`}>{colors.label}</span>
            </div>

            {/* Name */}
            <h3 className="text-white font-black text-lg uppercase tracking-widest text-center group-hover:text-yellow-300 transition-colors duration-300">
                {name}
            </h3>

            {(species || homeworld) && (
                <div className="mt-3 pt-3 border-t border-white/10 space-y-1">
                    {species && (
                        <div className="flex justify-between items-center">
                            <span className="text-[10px] text-gray-500 uppercase tracking-[0.2em]">Espèce</span>
                            <span className="text-[11px] text-gray-300 font-medium">{species}</span>
                        </div>
                    )}
                    {homeworld && (
                        <div className="flex justify-between items-center">
                            <span className="text-[10px] text-gray-500 uppercase tracking-[0.2em]">Planète</span>
                            <span className="text-[11px] text-gray-300 font-medium">{homeworld}</span>
                        </div>
                    )}
                </div>
            )}

            {/* Hover scan animation */}
            <div className="absolute inset-0 w-full bg-linear-to-b from-transparent via-white/5 to-transparent -translate-y-full group-hover:translate-y-full transition-transform duration-1000 pointer-events-none" />
        </div>
    );
}

export default CharacterCard;