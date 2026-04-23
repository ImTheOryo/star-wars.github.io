type GenderKey = "male" | "female" | "unknown" | "n/a" | "hermaphrodite" | "none";

const GENDER_THEME: Record<GenderKey, {
    accent: string;
    accentDim: string;
    border: string;
    borderHover: string;
    glow: string;
    glowHover: string;
    badge: string;
    label: string;
    helmetStroke: string;
}> = {
    male: {
        accent:      "#38bdf8",
        accentDim:   "rgba(56,189,248,0.5)",
        border:      "rgba(56,189,248,0.2)",
        borderHover: "rgba(56,189,248,0.55)",
        glow:        "rgba(56,189,248,0.0)",
        glowHover:   "rgba(56,189,248,0.18)",
        badge:       "rgba(56,189,248,0.1)",
        label:       "Masculin",
        helmetStroke:"#38bdf8",
    },
    female: {
        accent:      "#e879f9",
        accentDim:   "rgba(232,121,249,0.5)",
        border:      "rgba(232,121,249,0.2)",
        borderHover: "rgba(232,121,249,0.55)",
        glow:        "rgba(232,121,249,0.0)",
        glowHover:   "rgba(232,121,249,0.18)",
        badge:       "rgba(232,121,249,0.1)",
        label:       "Féminin",
        helmetStroke:"#e879f9",
    },
    hermaphrodite: {
        accent:      "#a78bfa",
        accentDim:   "rgba(167,139,250,0.5)",
        border:      "rgba(167,139,250,0.2)",
        borderHover: "rgba(167,139,250,0.55)",
        glow:        "rgba(167,139,250,0.0)",
        glowHover:   "rgba(167,139,250,0.18)",
        badge:       "rgba(167,139,250,0.1)",
        label:       "Hermaphrodite",
        helmetStroke:"#a78bfa",
    },
    none: {
        accent:      "#34d399",
        accentDim:   "rgba(52,211,153,0.5)",
        border:      "rgba(52,211,153,0.2)",
        borderHover: "rgba(52,211,153,0.55)",
        glow:        "rgba(52,211,153,0.0)",
        glowHover:   "rgba(52,211,153,0.18)",
        badge:       "rgba(52,211,153,0.1)",
        label:       "Aucun",
        helmetStroke:"#34d399",
    },
    unknown: {
        accent:      "#fbbf24",
        accentDim:   "rgba(251,191,36,0.5)",
        border:      "rgba(251,191,36,0.2)",
        borderHover: "rgba(251,191,36,0.55)",
        glow:        "rgba(251,191,36,0.0)",
        glowHover:   "rgba(251,191,36,0.18)",
        badge:       "rgba(251,191,36,0.1)",
        label:       "Inconnu",
        helmetStroke:"#fbbf24",
    },
    "n/a": {
        accent:      "#94a3b8",
        accentDim:   "rgba(148,163,184,0.5)",
        border:      "rgba(148,163,184,0.18)",
        borderHover: "rgba(148,163,184,0.45)",
        glow:        "rgba(148,163,184,0.0)",
        glowHover:   "rgba(148,163,184,0.12)",
        badge:       "rgba(148,163,184,0.08)",
        label:       "N/A",
        helmetStroke:"#94a3b8",
    },
};

// ── Mini helmet SVG ─────────────────────────────────────────────────────────
function MiniHelmet({ accent, initials }: { accent: string; initials: string }) {
    return (
        <div
            className="relative flex items-center justify-center overflow-hidden"
            style={{
                width: 72,
                height: 72,
                background: `radial-gradient(circle at 40% 35%, ${accent}12 0%, #07070b 70%)`,
                border: `1px solid ${accent}30`,
                borderRadius: 2,
                flexShrink: 0,
            }}
        >
            {/* Scanlines */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, ${accent}07 2px, ${accent}07 3px)`,
                }}
            />

            <svg viewBox="0 0 60 80" width={44} height={44} fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Dome */}
                <path
                    d="M10 40 C10 18 50 18 50 40 L50 55 C50 63 42 68 30 68 C18 68 10 63 10 55 Z"
                    stroke={accent} strokeWidth="1.2" fill={`${accent}08`}
                />
                {/* Visor */}
                <path
                    d="M15 39 C15 31 45 31 45 39 L44 45 C44 49 39 51 30 51 C21 51 16 49 16 45 Z"
                    stroke={accent} strokeWidth="0.8" fill={`${accent}18`}
                />
                {/* Ear pieces */}
                <rect x="6"  y="42" width="5" height="9" rx="1" stroke={accent} strokeWidth="0.8" fill="none" />
                <rect x="49" y="42" width="5" height="9" rx="1" stroke={accent} strokeWidth="0.8" fill="none" />
                {/* Neck */}
                <rect x="22" y="66" width="16" height="6" rx="1" stroke={accent} strokeWidth="0.8" fill="none" />
                {/* Top ridge */}
                <line x1="30" y1="18" x2="30" y2="25" stroke={accent} strokeWidth="1.2" />
            </svg>

            {/* Initials */}
            <span
                className="absolute bottom-1.5 left-0 right-0 text-center font-mono text-[7px] tracking-[0.3em] uppercase"
                style={{ color: accent, opacity: 0.6 }}
            >
                {initials}
            </span>

            {/* Corner brackets */}
            <div className="absolute top-1 left-1 w-2 h-2 border-t border-l" style={{ borderColor: `${accent}60` }} />
            <div className="absolute top-1 right-1 w-2 h-2 border-t border-r" style={{ borderColor: `${accent}60` }} />
            <div className="absolute bottom-1 left-1 w-2 h-2 border-b border-l" style={{ borderColor: `${accent}60` }} />
            <div className="absolute bottom-1 right-1 w-2 h-2 border-b border-r" style={{ borderColor: `${accent}60` }} />
        </div>
    );
}

// ── Props ───────────────────────────────────────────────────────────────────
interface CharacterCardProps {
    name: string;
    species?: string;
    homeworld?: string;
    gender: GenderKey;
    dossierNo?: string | number;
}

// ── Component ────────────────────────────────────────────────────────────────
function CharacterCard({
                           name,
                           species,
                           homeworld,
                           gender = "unknown",
                           dossierNo,
                       }: CharacterCardProps) {
    const t = GENDER_THEME[gender] ?? GENDER_THEME["unknown"];
    const initials = name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
    const no = dossierNo !== undefined ? String(dossierNo).padStart(4, "0") : null;

    return (
        <div
            className="group relative overflow-hidden cursor-pointer transition-all duration-300"
            style={{
                background: "#07070b",
                border: `1px solid ${t.border}`,
                fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                // CSS custom prop trick for hover — handled via inline onMouse
            }}
            onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.borderColor = t.borderHover;
                el.style.boxShadow = `0 0 32px ${t.glowHover}, inset 0 0 24px ${t.glowHover}`;
            }}
            onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.borderColor = t.border;
                el.style.boxShadow = "none";
            }}
        >
            {/* Noise texture */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.018]"
                style={{
                    backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
                    backgroundSize: "200px 200px",
                }}
            />

            {/* Scan sweep on hover */}
            <div
                className="absolute inset-0 pointer-events-none -translate-y-full group-hover:translate-y-full transition-transform duration-[900ms] ease-in-out"
                style={{
                    background: `linear-gradient(to bottom, transparent 0%, ${t.accent}06 50%, transparent 100%)`,
                }}
            />

            {/* ── Top bar: dossier no + status ── */}
            <div
                className="flex items-center justify-between px-4 py-2"
                style={{
                    borderBottom: `1px solid ${t.border}`,
                    background: `${t.accent}06`,
                }}
            >
                <span className="font-mono text-[8px] tracking-[0.4em] uppercase" style={{ color: `${t.accent}55` }}>
                    {no ? `N° ${no}` : "Dossier"}
                </span>
                <div className="flex items-center gap-1.5">
                    <div
                        className="w-1.5 h-1.5 rounded-full animate-pulse"
                        style={{ background: t.accent }}
                    />
                    <span className="font-mono text-[8px] tracking-[0.35em] uppercase" style={{ color: t.accent }}>
                        {t.label}
                    </span>
                </div>
            </div>

            {/* ── Body ── */}
            <div className="p-4">

                {/* Avatar + name row */}
                <div className="flex items-start gap-4 mb-4">
                    <MiniHelmet accent={t.accent} initials={initials} />

                    <div className="flex flex-col justify-center min-w-0 pt-1">
                        {/* Classification stamp */}
                        <span
                            className="font-mono text-[7px] tracking-[0.45em] uppercase mb-1.5"
                            style={{ color: `${t.accent}45` }}
                        >
                            Identification
                        </span>

                        {/* Name */}
                        <h3
                            className="font-black uppercase leading-none break-words"
                            style={{
                                fontSize: "clamp(0.85rem, 2.5vw, 1.05rem)",
                                letterSpacing: "-0.01em",
                                color: "rgba(255,255,255,0.92)",
                                textShadow: `0 0 20px ${t.accent}25`,
                            }}
                        >
                            {name}
                        </h3>

                        {/* Underline accent */}
                        <div
                            className="mt-2 h-px w-8 group-hover:w-full transition-all duration-500"
                            style={{ background: t.accent }}
                        />
                    </div>
                </div>

                {/* ── Info rows ── */}
                {(species || homeworld) && (
                    <div
                        className="space-y-0"
                        style={{ borderTop: `1px solid ${t.border}` }}
                    >
                        {species && (
                            <div
                                className="flex items-center justify-between py-2.5"
                                style={{ borderBottom: `1px solid rgba(255,255,255,0.04)` }}
                            >
                                <span
                                    className="font-mono text-[8px] uppercase tracking-[0.4em]"
                                    style={{ color: "rgba(255,255,255,0.28)" }}
                                >
                                    Espèce
                                </span>
                                <span
                                    className="font-mono text-[10px] uppercase tracking-widest font-medium"
                                    style={{ color: "rgba(255,255,255,0.7)" }}
                                >
                                    {species}
                                </span>
                            </div>
                        )}
                        {homeworld && (
                            <div className="flex items-center justify-between py-2.5">
                                <span
                                    className="font-mono text-[8px] uppercase tracking-[0.4em]"
                                    style={{ color: "rgba(255,255,255,0.28)" }}
                                >
                                    Planète
                                </span>
                                <span
                                    className="font-mono text-[10px] uppercase tracking-widest font-medium"
                                    style={{ color: "rgba(255,255,255,0.7)" }}
                                >
                                    {homeworld}
                                </span>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* ── Bottom accent bar ── */}
            <div
                className="h-px w-0 group-hover:w-full transition-all duration-500"
                style={{ background: `linear-gradient(to right, ${t.accent}, transparent)` }}
            />

            {/* Corner brackets */}
            {(["top-2 left-2 border-t border-l", "top-2 right-2 border-t border-r",
                    "bottom-2 left-2 border-b border-l", "bottom-2 right-2 border-b border-r"] as const
            ).map((cls) => (
                <div
                    key={cls}
                    className={`absolute w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${cls}`}
                    style={{ borderColor: t.accentDim }}
                />
            ))}
        </div>
    );
}

export default CharacterCard;