import { Link } from "react-router";
function StarField() {
    // On génère les étoiles avec des propriétés de mouvement uniques
    const stars = Array.from({ length: 100 }, (_, i) => {
        const size = Math.random() > 0.8 ? 2 : 1;
        return {
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size,
            opacity: 0.3 + Math.random() * 0.7,
            // Les plus grosses étoiles bougent plus (effet de profondeur)
            speed: size === 2 ? 40 + Math.random() * 20 : 60 + Math.random() * 40,
            delay: Math.random() * -20, // Start en plein milieu de l'anim
        };
    });

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <style>
                {`
                    @keyframes drift {
                        0% { transform: translate(0, 0); }
                        100% { transform: translate(-100px, 50px); } /* Direction diagonale */
                    }
                    @keyframes twinkle {
                        0%, 100% { opacity: 0.3; }
                        50% { opacity: 1; }
                    }
                `}
            </style>

            {stars.map((star) => (
                <div
                    key={star.id}
                    className="absolute rounded-full bg-white"
                    style={{
                        left: `${star.x}%`,
                        top: `${star.y}%`,
                        width: `${star.size}px`,
                        height: `${star.size}px`,
                        opacity: star.opacity,
                        /* On combine le scintillement et le mouvement */
                        animation: `
                            twinkle ${2 + Math.random() * 3}s ease-in-out infinite,
                            drift ${star.speed}s linear infinite
                        `,
                        animationDelay: `${star.delay}s`,
                    }}
                />
            ))}
        </div>
    );
}

function App() {
    return (
        <div className="relative min-h-[calc(100vh-73px)] bg-black text-white overflow-hidden flex flex-col">
            {/* Starfield */}
            <StarField />

            {/* Nebula ambient glow */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-500/3 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/3 rounded-full blur-3xl" />
            </div>

            {/* Main hero */}
            <main className="relative z-10 flex flex-col items-center justify-center flex-1 text-center px-6 py-16">

                {/* Iconic Star Wars title treatment */}
                <div className="mb-2">
                    <p className="text-yellow-500/60 text-xs font-mono tracking-[0.5em] uppercase mb-4 animate-pulse">
                        Il y a bien longtemps, dans une galaxie lointaine...
                    </p>
                </div>

                {/* Title with perspective */}
                <div className="mb-12" style={{ perspective: '600px' }}>
                    <h1
                        className="text-7xl md:text-9xl font-black text-yellow-400 uppercase tracking-tighter leading-none"
                        style={{
                            textShadow: '0 0 40px rgba(234,179,8,0.5), 0 0 80px rgba(234,179,8,0.2)',
                            transform: 'rotateX(5deg)',
                        }}
                    >
                        STAR WARS
                    </h1>
                    <p className="text-yellow-600/80 text-sm font-black uppercase tracking-[1em] mt-2">
                        EXPLORER
                    </p>
                </div>

                {/* Scroll text in a box */}
                <div className="max-w-lg w-full mb-12 relative overflow-hidden"
                     style={{ perspective: '500px' }}>
                    <div
                        className="bg-black/30 border border-yellow-500/20 p-6 text-center"
                        style={{ clipPath: 'polygon(16px 0%, 100% 0%, calc(100% - 16px) 100%, 0% 100%)' }}
                    >
                        <p className="text-yellow-200/70 text-base leading-relaxed font-medium uppercase italic tracking-wide">
                            Explorez les confins de la galaxie. Découvrez les héros et les vilains, les planètes légendaires et les films qui ont marqué l'histoire du cinéma.
                        </p>
                    </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                        to="/films"
                        className="group relative px-8 py-3 bg-yellow-500 text-black font-black uppercase tracking-[0.2em] text-sm overflow-hidden transition-all duration-300 hover:bg-yellow-400 hover:shadow-[0_0_30px_rgba(234,179,8,0.6)]"
                    >
                        <span className="relative z-10">Voir les Films</span>
                        <div className="absolute inset-0 bg-white/20 translate-x-[-101%] group-hover:translate-x-[101%] transition-transform duration-500 skew-x-12" />
                    </Link>
                    <Link
                        to="/personnages"
                        className="group px-8 py-3 border border-yellow-500/60 text-yellow-400 font-black uppercase tracking-[0.2em] text-sm transition-all duration-300 hover:border-yellow-400 hover:text-yellow-300 hover:shadow-[0_0_20px_rgba(234,179,8,0.2)] hover:bg-yellow-500/5"
                    >
                        Explorer l'Univers
                    </Link>
                </div>
            </main>

            {/* Bottom decoration */}
            <div className="relative z-10 pb-8 flex justify-center gap-8 text-yellow-700/40 text-[10px] font-mono tracking-[0.4em] uppercase">
                <span>Films</span>
                <span>·</span>
                <span>Personnages</span>
                <span>·</span>
                <span>Planètes</span>
            </div>
        </div>
    );
}

export default App;