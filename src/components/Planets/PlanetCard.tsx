interface PlanetCardProps {
    name: string;
    climate?: string;
    population?: string;
    terrain?: string;
}

function PlanetCard({ name, climate, population, terrain }: PlanetCardProps) {
    return (
        <div className="group relative bg-black/70 backdrop-blur-md border border-yellow-500/20 hover:border-yellow-500/60 transition-all duration-500 cursor-pointer overflow-hidden p-6"
             style={{ clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))' }}>

            {/* Scanlines */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
                 style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,1) 3px, rgba(255,255,255,1) 4px)' }} />

            {/* Planet orb */}
            <div className="relative w-20 h-20 mx-auto mb-4">
                <div className="absolute inset-0 rounded-full bg-linear-to-br from-yellow-900/40 via-gray-900 to-black border border-yellow-500/30 group-hover:border-yellow-500/70 transition-all duration-500" />
                <div className="absolute inset-0.75 rounded-full bg-linear-to-tl from-transparent via-yellow-500/5 to-yellow-500/20 group-hover:to-yellow-500/30 transition-all duration-500" />
                {/* Ring */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-5 border border-yellow-500/20 rounded-full group-hover:border-yellow-500/50 transition-all duration-500"
                     style={{ transform: 'translate(-50%, -50%) rotateX(75deg)' }} />
                <span className="absolute inset-0 flex items-center justify-center text-xl font-black text-yellow-500/80">{name.charAt(0)}</span>
            </div>

            {/* Coordinates-style label */}
            <div className="text-center mb-3">
                <span className="text-[9px] text-yellow-700 font-mono tracking-[0.3em]">SYSTEME-{Math.abs(name.charCodeAt(0) * 37).toString().padStart(4, '0')}</span>
            </div>

            <h3 className="text-yellow-300 font-black text-xl uppercase tracking-[0.15em] text-center group-hover:text-yellow-200 transition-colors duration-300 mb-4">
                {name}
            </h3>

            {(climate || terrain || population) && (
                <div className="space-y-2 border-t border-yellow-500/20 pt-3">
                    {climate && (
                        <div className="flex items-center gap-2">
                            <span className="text-yellow-600 text-[10px] font-mono uppercase tracking-[0.2em] w-20 shrink-0">Climat</span>
                            <div className="h-px flex-1 bg-yellow-900/50" />
                            <span className="text-gray-400 text-[11px] capitalize">{climate}</span>
                        </div>
                    )}
                    {terrain && (
                        <div className="flex items-center gap-2">
                            <span className="text-yellow-600 text-[10px] font-mono uppercase tracking-[0.2em] w-20 shrink-0">Terrain</span>
                            <div className="h-px flex-1 bg-yellow-900/50" />
                            <span className="text-gray-400 text-[11px] capitalize">{terrain}</span>
                        </div>
                    )}
                    {population && (
                        <div className="flex items-center gap-2">
                            <span className="text-yellow-600 text-[10px] font-mono uppercase tracking-[0.2em] w-20 shrink-0">Pop.</span>
                            <div className="h-px flex-1 bg-yellow-900/50" />
                            <span className="text-gray-400 text-[11px]">{population}</span>
                        </div>
                    )}
                </div>
            )}

            {/* Bottom glow on hover */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-500/0 to-transparent group-hover:via-yellow-500/60 transition-all duration-700" />
        </div>
    );
}

export default PlanetCard;