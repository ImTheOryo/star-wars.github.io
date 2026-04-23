import { Link } from "react-router";
import { useState } from "react";

function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="sticky z-50 top-0 w-full bg-black/90 backdrop-blur-md border-b border-yellow-500/30 overflow-hidden">
            {/* Animated top line */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-yellow-500 to-transparent animate-[shimmer_3s_linear_infinite]"
                 style={{ backgroundSize: '200% 100%' }} />

            {/* Scanlines overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.02]"
                 style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, white 3px, white 4px)' }} />

            <div className="relative max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="group flex items-center gap-3">
                    {/* Lightsaber icon */}
                    <div className="relative w-1 h-8 bg-yellow-400 rounded-full shadow-[0_0_8px_rgba(250,204,21,0.8)] group-hover:shadow-[0_0_16px_rgba(250,204,21,1)] transition-all duration-300">
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-2 bg-gray-700 rounded-sm" />
                    </div>
                    <div>
                        <span className="text-2xl font-black uppercase tracking-[0.15em] text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)] group-hover:drop-shadow-[0_0_16px_rgba(250,204,21,0.8)] transition-all duration-300">
                            Star Wars
                        </span>
                        <span className="block text-[9px] text-yellow-700 tracking-[0.6em] uppercase font-medium -mt-1">
                            Explorer
                        </span>
                    </div>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:block">
                    <ul className="flex items-center gap-1">
                        {[
                            { to: "/", label: "Accueil" },
                            { to: "/films", label: "Films" },
                            { to: "/personnages", label: "Personnages" },
                            { to: "/planetes", label: "Planètes" },
                        ].map((item) => (
                            <li key={item.to}>
                                <Link
                                    to={item.to}
                                    className="relative group px-4 py-2 text-sm font-bold uppercase tracking-[0.15em] text-gray-400 hover:text-yellow-300 transition-colors duration-300"
                                >
                                    {item.label}
                                    <span className="absolute bottom-0 left-0 w-0 h-px bg-yellow-400 group-hover:w-full transition-all duration-300" />
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Mobile menu button */}
                <button
                    className="md:hidden flex flex-col gap-1 p-2"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Menu"
                >
                    <span className={`block w-6 h-0.5 bg-yellow-400 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
                    <span className={`block w-6 h-0.5 bg-yellow-400 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
                    <span className={`block w-6 h-0.5 bg-yellow-400 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
                </button>
            </div>

            {/* Mobile menu */}
            <div className={`md:hidden border-t border-yellow-500/20 overflow-hidden transition-all duration-300 ${menuOpen ? 'max-h-64' : 'max-h-0'}`}>
                <nav className="px-6 py-4 space-y-3">
                    {[
                        { to: "/", label: "Accueil" },
                        { to: "/films", label: "Films" },
                        { to: "/personnages", label: "Personnages" },
                        { to: "/planetes", label: "Planètes" },
                    ].map((item) => (
                        <Link
                            key={item.to}
                            to={item.to}
                            onClick={() => setMenuOpen(false)}
                            className="block text-sm font-bold uppercase tracking-[0.15em] text-gray-400 hover:text-yellow-300 transition-colors duration-200 py-1"
                        >
                            <span className="text-yellow-700 mr-2">›</span>{item.label}
                        </Link>
                    ))}
                </nav>
            </div>
        </header>
    );
}

export default Header;