import { Link, useParams } from "react-router";
import { useFetch } from "../../hooks/useFetch.ts";
import { usePlanets } from "../../contexts/PlanetContext.tsx";
import { useSpecies } from "../../contexts/SpecieContext.tsx";
import { useStarship } from "../../contexts/StarshipContext.tsx";
import { useVehicle } from "../../contexts/VehicleContext.tsx";
import { FaRegShareFromSquare } from "react-icons/fa6";
import type { Character } from "../../services/CharacterService.ts";
import LinkedList from "../../components/Character/LinkedList.tsx";

// ── Gender → palette ──────────────────────────────────────────────────────────
type GenderKey = "male" | "female" | "unknown" | "n/a" | "hermaphrodite" | "none";

const GENDER_THEME: Record<
    GenderKey,
    { accent: string; accentMuted: string; accentUltra: string; border: string; borderHover: string; badge: string; glow: string; scanColor: string; label: string }
> = {
    male: {
        accent:      "#38bdf8",   // sky-400
        accentMuted: "#0ea5e9",
        accentUltra: "rgba(56,189,248,0.08)",
        border:      "rgba(56,189,248,0.25)",
        borderHover: "rgba(56,189,248,0.6)",
        badge:       "rgba(56,189,248,0.12)",
        glow:        "rgba(56,189,248,0.18)",
        scanColor:   "rgba(56,189,248,0.06)",
        label:       "Masculin",
    },
    female: {
        accent:      "#e879f9",   // fuchsia-400
        accentMuted: "#c026d3",
        accentUltra: "rgba(232,121,249,0.08)",
        border:      "rgba(232,121,249,0.25)",
        borderHover: "rgba(232,121,249,0.6)",
        badge:       "rgba(232,121,249,0.12)",
        glow:        "rgba(232,121,249,0.18)",
        scanColor:   "rgba(232,121,249,0.06)",
        label:       "Féminin",
    },
    hermaphrodite: {
        accent:      "#a78bfa",   // violet-400
        accentMuted: "#7c3aed",
        accentUltra: "rgba(167,139,250,0.08)",
        border:      "rgba(167,139,250,0.25)",
        borderHover: "rgba(167,139,250,0.6)",
        badge:       "rgba(167,139,250,0.12)",
        glow:        "rgba(167,139,250,0.18)",
        scanColor:   "rgba(167,139,250,0.06)",
        label:       "Hermaphrodite",
    },
    none: {
        accent:      "#34d399",   // emerald-400
        accentMuted: "#059669",
        accentUltra: "rgba(52,211,153,0.08)",
        border:      "rgba(52,211,153,0.25)",
        borderHover: "rgba(52,211,153,0.6)",
        badge:       "rgba(52,211,153,0.12)",
        glow:        "rgba(52,211,153,0.18)",
        scanColor:   "rgba(52,211,153,0.06)",
        label:       "Aucun",
    },
    unknown: {
        accent:      "#fbbf24",   // amber-400
        accentMuted: "#d97706",
        accentUltra: "rgba(251,191,36,0.08)",
        border:      "rgba(251,191,36,0.25)",
        borderHover: "rgba(251,191,36,0.6)",
        badge:       "rgba(251,191,36,0.12)",
        glow:        "rgba(251,191,36,0.18)",
        scanColor:   "rgba(251,191,36,0.06)",
        label:       "Inconnu",
    },
    "n/a": {
        accent:      "#94a3b8",   // slate-400
        accentMuted: "#64748b",
        accentUltra: "rgba(148,163,184,0.08)",
        border:      "rgba(148,163,184,0.25)",
        borderHover: "rgba(148,163,184,0.5)",
        badge:       "rgba(148,163,184,0.10)",
        glow:        "rgba(148,163,184,0.12)",
        scanColor:   "rgba(148,163,184,0.05)",
        label:       "N/A",
    },
};

function getTheme(gender: string) {
    return GENDER_THEME[(gender as GenderKey)] ?? GENDER_THEME["unknown"];
}

// ── Avatar placeholder ────────────────────────────────────────────────────────
function AvatarPlaceholder({ name, accent, border, scanColor }: { name: string; accent: string; border: string; scanColor: string }) {
    const initials = name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
    return (
        <div
            className="relative flex items-center justify-center overflow-hidden"
            style={{
                width: "100%",
                aspectRatio: "3/4",
                background: `linear-gradient(160deg, #0a0a0f 0%, #0d1117 100%)`,
                border: `1px solid ${border}`,
            }}
        >
            {/* scanlines */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, ${scanColor} 2px, ${scanColor} 3px)`,
                }}
            />

            {/* Helmet SVG */}
            <svg
                viewBox="0 0 120 160"
                className="w-4/5 opacity-30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* Helmet dome */}
                <path
                    d="M20 80 C20 35 100 35 100 80 L100 110 C100 125 85 135 60 135 C35 135 20 125 20 110 Z"
                    stroke={accent} strokeWidth="1.5" fill={`${accent}08`}
                />
                {/* Visor */}
                <path
                    d="M30 78 C30 62 90 62 90 78 L88 90 C88 96 80 100 60 100 C40 100 32 96 32 90 Z"
                    stroke={accent} strokeWidth="1" fill={`${accent}15`}
                />
                {/* Chin strap lines */}
                <line x1="28" y1="105" x2="22" y2="115" stroke={accent} strokeWidth="1" />
                <line x1="92" y1="105" x2="98" y2="115" stroke={accent} strokeWidth="1" />
                {/* Neck */}
                <rect x="45" y="133" width="30" height="12" rx="2" stroke={accent} strokeWidth="1" fill="none" />
                {/* Center line */}
                <line x1="60" y1="100" x2="60" y2="133" stroke={accent} strokeWidth="0.5" strokeDasharray="2 2" />
                {/* Ear pieces */}
                <rect x="14" y="85" width="8" height="18" rx="1" stroke={accent} strokeWidth="1" fill="none" />
                <rect x="98" y="85" width="8" height="18" rx="1" stroke={accent} strokeWidth="1" fill="none" />
                {/* Top ridge */}
                <line x1="60" y1="35" x2="60" y2="50" stroke={accent} strokeWidth="1.5" />
                <line x1="45" y1="40" x2="75" y2="40" stroke={accent} strokeWidth="0.5" />
            </svg>

            {/* Initials overlay */}
            <div
                className="absolute bottom-6 left-0 right-0 flex justify-center"
            >
                <span
                    className="font-mono text-xs tracking-[0.5em] uppercase"
                    style={{ color: accent, opacity: 0.7 }}
                >
                    {initials}
                </span>
            </div>

            {/* Corner brackets */}
            {[
                "top-2 left-2 border-t border-l",
                "top-2 right-2 border-t border-r",
                "bottom-2 left-2 border-b border-l",
                "bottom-2 right-2 border-b border-r",
            ].map((cls) => (
                <div
                    key={cls}
                    className={`absolute w-4 h-4 ${cls}`}
                    style={{ borderColor: accent }}
                />
            ))}

            {/* CLASSIFIED stamp */}
            <div
                className="absolute top-3 right-8 rotate-12 font-mono text-[8px] tracking-widest uppercase px-1 py-0.5"
                style={{
                    color: accent,
                    border: `1px solid ${accent}`,
                    opacity: 0.35,
                }}
            >
                CLASSIFIÉ
            </div>
        </div>
    );
}

// ── Field row ─────────────────────────────────────────────────────────────────
function Field({ label, value }: { label: string; value: string; accent: string }) {
    return (
        <div className="py-2.5 border-b border-white/5 last:border-b-0 flex justify-between gap-4 items-baseline">
            <span className="text-[9px] font-mono uppercase tracking-[0.4em] text-gray-600 shrink-0">{label}</span>
            <span className="font-mono text-xs text-right" style={{ color: "rgba(255,255,255,0.75)" }}>
                {value || "—"}
            </span>
        </div>
    );
}

// ── Section header ─────────────────────────────────────────────────────────────
function SectionHeader({ label, count, accent }: { label: string; count?: number; accent: string }) {
    return (
        <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-4" style={{ background: accent }} />
            <span className="text-[9px] font-mono uppercase tracking-[0.5em]" style={{ color: accent, opacity: 0.7 }}>
                {label}
            </span>
            <div className="h-px flex-1" style={{ background: `${accent}25` }} />
            {count !== undefined && (
                <span className="font-mono text-xs font-bold" style={{ color: accent }}>
                    {String(count).padStart(2, "0")}
                </span>
            )}
        </div>
    );
}

// ── Main component ─────────────────────────────────────────────────────────────
function CharacterDetailPage() {
    const { personId } = useParams();
    const { data, isLoading } = useFetch<Character>(`https://swapi.dev/api/people/${personId}`);

    const { planets }   = usePlanets();
    const { species }   = useSpecies();
    const { starships } = useStarship();
    const { vehicles }  = useVehicle();

    const homeworld          = planets.find((p) => p.url === data?.homeworld);
    const characterSpecies   = species.filter((s) => data?.species.includes(s.url));
    const characterStarships = starships.filter((s) => data?.starships.includes(s.url));
    const characterVehicles  = vehicles.filter((v) => data?.vehicles.includes(v.url));

    /* ── Loading ── */
    if (isLoading || !data) {
        return (
            <div className="min-h-screen bg-[#07070b] flex items-center justify-center">
                <div className="flex flex-col items-center gap-5">
                    <div className="relative w-48 h-px bg-white/5 overflow-hidden">
                        <div
                            className="absolute inset-y-0 left-0 w-1/3 animate-[loading_1.5s_ease-in-out_infinite]"
                            style={{ background: "#38bdf8", boxShadow: "0 0 8px rgba(56,189,248,0.8)" }}
                        />
                    </div>
                    <span className="text-[9px] font-mono text-sky-800 tracking-[0.5em] uppercase animate-pulse">
                        Identification en cours...
                    </span>
                </div>
            </div>
        );
    }

    const theme = getTheme(data.gender);

    // Dossier number from personId
    const dossierNo = String(personId ?? "?").padStart(4, "0");
    const createdDate = new Date(data.created).toLocaleDateString("fr-FR");
    const editedDate  = new Date(data.edited).toLocaleDateString("fr-FR");
    const speciesName = characterSpecies[0]?.name ?? (data.species.length === 0 ? "Humain" : "Inconnu");

    return (
        <div className="min-h-screen text-white relative overflow-hidden" style={{ background: "#07070b", fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}>

            {/* ── Ambient glow ── */}
            <div
                className="absolute top-0 left-0 w-[700px] h-[700px] rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2"
                style={{ background: theme.glow }}
            />
            <div
                className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full blur-3xl pointer-events-none translate-x-1/3 translate-y-1/3"
                style={{ background: theme.glow, opacity: 0.5 }}
            />

            {/* ── Noise texture overlay ── */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.025]"
                style={{
                    backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
                    backgroundSize: "256px 256px",
                }}
            />

            {/* ── TOP ACCENT LINE ── */}
            <div className="h-px" style={{ background: `linear-gradient(to right, transparent, ${theme.accent}, transparent)` }} />

            {/* ════════════════════════════════════
                HERO SECTION
            ════════════════════════════════════ */}
            <div className="relative border-b" style={{ borderColor: theme.border }}>
                <div className="max-w-6xl mx-auto px-6 py-10">

                    {/* Document header bar */}
                    <div className="flex items-center justify-between mb-8 pb-4 border-b" style={{ borderColor: `${theme.accent}20` }}>
                        <div className="flex items-center gap-6">
                            <div>
                                <p className="text-[8px] font-mono tracking-[0.5em] uppercase mb-0.5" style={{ color: `${theme.accent}60` }}>République Galactique</p>
                                <p className="text-[8px] font-mono tracking-[0.5em] uppercase" style={{ color: `${theme.accent}40` }}>Bureau des Identités</p>
                            </div>
                            <div className="w-px h-8" style={{ background: theme.border }} />
                            <div>
                                <p className="text-[8px] font-mono tracking-[0.4em] uppercase mb-0.5" style={{ color: `${theme.accent}50` }}>Dossier N°</p>
                                <p className="text-sm font-mono font-bold" style={{ color: theme.accent }}>{dossierNo}</p>
                            </div>
                        </div>
                        <div className="text-right hidden sm:block">
                            <p className="text-[8px] font-mono tracking-[0.4em] uppercase mb-0.5" style={{ color: `${theme.accent}50` }}>Statut</p>
                            <span
                                className="text-[9px] font-mono px-2 py-0.5 uppercase tracking-widest"
                                style={{ color: theme.accent, border: `1px solid ${theme.border}`, background: theme.badge }}
                            >
                                Actif
                            </span>
                        </div>
                    </div>

                    {/* Main hero grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 lg:gap-12">

                        {/* ── Avatar column ── */}
                        <div className="flex flex-col gap-4">
                            <AvatarPlaceholder
                                name={data.name}
                                accent={theme.accent}
                                border={theme.border}
                                scanColor={theme.scanColor}
                            />
                            {/* Photo ID label */}
                            <div
                                className="flex items-center justify-between px-3 py-2 text-[8px] font-mono uppercase tracking-widest"
                                style={{ border: `1px solid ${theme.border}`, background: theme.accentUltra, color: `${theme.accent}70` }}
                            >
                                <span>Identification visuelle</span>
                                <span>{dossierNo}</span>
                            </div>
                        </div>

                        {/* ── Identity column ── */}
                        <div className="flex flex-col justify-between">

                            {/* Name block */}
                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="w-0.5 h-4" style={{ background: theme.accent }} />
                                    <span className="text-[9px] font-mono uppercase tracking-[0.5em]" style={{ color: `${theme.accent}70` }}>Identité confirmée</span>
                                </div>

                                <h1
                                    className="text-5xl md:text-6xl lg:text-7xl font-black uppercase leading-none mb-1"
                                    style={{
                                        letterSpacing: "-0.03em",
                                        color: "white",
                                        textShadow: `0 0 60px ${theme.accent}30`,
                                    }}
                                >
                                    {data.name}
                                </h1>

                                {/* Underline accent */}
                                <div className="flex items-center gap-3 mt-3 mb-6">
                                    <div className="h-px w-16" style={{ background: theme.accent }} />
                                    <span className="text-[10px] font-mono" style={{ color: `${theme.accent}60` }}>
                                        {data.birth_year !== "unknown" ? `Né(e) en ${data.birth_year}` : "Origine inconnue"}
                                    </span>
                                </div>

                                {/* Badges */}
                                <div className="flex flex-wrap gap-2 mb-8">
                                    {[
                                        { value: theme.label, show: true },
                                        { value: homeworld?.name, show: !!homeworld },
                                        { value: speciesName, show: true },
                                    ].filter(b => b.show && b.value).map(({ value }) => (
                                        <span
                                            key={value}
                                            className="text-[9px] font-mono px-3 py-1 uppercase tracking-widest"
                                            style={{
                                                border: `1px solid ${theme.border}`,
                                                background: theme.badge,
                                                color: theme.accent,
                                            }}
                                        >
                                            {value}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Quick stats grid — 4 boxes */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                {[
                                    { label: "Taille",    value: data.height !== "unknown" ? `${data.height} cm` : "—" },
                                    { label: "Masse",     value: data.mass   !== "unknown" ? `${data.mass} kg`   : "—" },
                                    { label: "Yeux",      value: data.eye_color },
                                    { label: "Cheveux",   value: data.hair_color },
                                ].map(({ label, value }) => (
                                    <div
                                        key={label}
                                        className="relative p-3 overflow-hidden"
                                        style={{
                                            border: `1px solid ${theme.border}`,
                                            background: theme.accentUltra,
                                            clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%)",
                                        }}
                                    >
                                        <p className="text-[8px] font-mono uppercase tracking-widest mb-1.5" style={{ color: `${theme.accent}55` }}>
                                            {label}
                                        </p>
                                        <p className="text-sm font-mono font-bold uppercase" style={{ color: "rgba(255,255,255,0.85)" }}>
                                            {value}
                                        </p>
                                        {/* corner accent */}
                                        <div className="absolute top-0 right-0 w-0 h-0"
                                             style={{
                                                 borderLeft: `10px solid transparent`,
                                                 borderTop: `10px solid ${theme.accent}`,
                                             }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ════════════════════════════════════
                BODY
            ════════════════════════════════════ */}
            <div className="max-w-6xl mx-auto px-6 py-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* ── Main col (2/3) ── */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Biometrics */}
                        <div>
                            <SectionHeader label="Données biométriques" accent={theme.accent} />
                            <div
                                className="relative overflow-hidden"
                                style={{
                                    border: `1px solid ${theme.border}`,
                                    background: "rgba(255,255,255,0.02)",
                                    clipPath: "polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))",
                                }}
                            >
                                {/* Scanlines */}
                                <div
                                    className="absolute inset-0 pointer-events-none"
                                    style={{
                                        backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 3px, ${theme.scanColor} 3px, ${theme.scanColor} 4px)`,
                                    }}
                                />
                                <div className="relative grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x">
                                    <div className="px-6 py-4">
                                        <Field label="Taille"    value={data.height !== "unknown" ? `${data.height} cm` : "Inconnue"} accent={theme.accent} />
                                        <Field label="Masse"     value={data.mass   !== "unknown" ? `${data.mass} kg`   : "Inconnue"} accent={theme.accent} />
                                        <Field label="Naissance" value={data.birth_year} accent={theme.accent} />
                                        <Field label="Genre"     value={theme.label} accent={theme.accent} />
                                    </div>
                                    <div className="px-6 py-4" style={{ borderLeft: `1px solid ${theme.border}` }}>
                                        <Field label="Couleur yeux"    value={data.eye_color}  accent={theme.accent} />
                                        <Field label="Couleur cheveux" value={data.hair_color} accent={theme.accent} />
                                        <Field label="Couleur peau"    value={data.skin_color} accent={theme.accent} />
                                        <Field label="Espèce"          value={speciesName} accent={theme.accent} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Films */}
                        {data.films.length > 0 && (
                            <div>
                                <SectionHeader label="Apparitions" count={data.films.length} accent={theme.accent} />
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    {data.films.map((filmUrl) => {
                                        const filmId = filmUrl.split("/").reverse()[1];
                                        return (
                                            <Link
                                                key={filmUrl}
                                                to={`/film/${filmId}`}
                                                className="group relative flex items-center justify-between p-4 transition-all duration-200"
                                                style={{
                                                    border: `1px solid ${theme.border}`,
                                                    background: theme.accentUltra,
                                                }}
                                                onMouseEnter={e => {
                                                    (e.currentTarget as HTMLElement).style.borderColor = theme.borderHover;
                                                    (e.currentTarget as HTMLElement).style.background = theme.badge;
                                                }}
                                                onMouseLeave={e => {
                                                    (e.currentTarget as HTMLElement).style.borderColor = theme.border;
                                                    (e.currentTarget as HTMLElement).style.background = theme.accentUltra;
                                                }}
                                            >
                                                {/* corner deco */}
                                                <div className="absolute top-0 left-0 w-3 h-3 border-t border-l" style={{ borderColor: theme.accent, opacity: 0.6 }} />
                                                <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r" style={{ borderColor: theme.accent, opacity: 0.6 }} />

                                                <div>
                                                    <p className="text-[8px] font-mono uppercase tracking-widest mb-1" style={{ color: `${theme.accent}60` }}>Épisode</p>
                                                    <p className="text-xs font-mono font-bold uppercase tracking-wide" style={{ color: "rgba(255,255,255,0.8)" }}>
                                                        #{filmId}
                                                    </p>
                                                </div>
                                                <FaRegShareFromSquare
                                                    className="text-xs transition-opacity opacity-30 group-hover:opacity-100"
                                                    style={{ color: theme.accent }}
                                                />
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* ── Sidebar (1/3) ── */}
                    <div className="space-y-6">

                        {/* Equipment */}
                        <div>
                            <SectionHeader label="Équipement" accent={theme.accent} />
                            <div
                                className="px-4 py-3"
                                style={{
                                    border: `1px solid ${theme.border}`,
                                    background: "rgba(255,255,255,0.01)",
                                }}
                            >
                                <LinkedList label="Vaisseaux" items={characterStarships} to={(s) => `/${s.url}`} />
                                <LinkedList label="Véhicules"  items={characterVehicles}  to={(v) => `/${v.url}`} />
                                {characterStarships.length === 0 && characterVehicles.length === 0 && (
                                    <p className="text-[10px] font-mono uppercase tracking-widest py-4 text-center" style={{ color: `${theme.accent}30` }}>
                                        Aucun enregistrement
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Homeworld */}
                        {homeworld && (
                            <div>
                                <SectionHeader label="Planète natale" accent={theme.accent} />
                                <div
                                    className="relative p-4"
                                    style={{
                                        border: `1px solid ${theme.border}`,
                                        background: theme.accentUltra,
                                    }}
                                >
                                    <div className="absolute top-0 left-0 w-3 h-3 border-t border-l" style={{ borderColor: theme.accent, opacity: 0.6 }} />
                                    <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r" style={{ borderColor: theme.accent, opacity: 0.6 }} />
                                    <p className="text-xs font-mono font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.85)" }}>
                                        {homeworld.name}
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Metadata */}
                        <div
                            className="p-4"
                            style={{
                                border: `1px solid ${theme.border}`,
                                background: "rgba(255,255,255,0.01)",
                                opacity: 0.6,
                            }}
                        >
                            <p className="text-[8px] font-mono uppercase tracking-[0.5em] mb-4" style={{ color: `${theme.accent}60` }}>
                                Métadonnées
                            </p>
                            <div className="space-y-3">
                                {[
                                    { label: "Créé le",    value: createdDate },
                                    { label: "Modifié le", value: editedDate  },
                                ].map(({ label, value }) => (
                                    <div key={label}>
                                        <p className="text-[8px] font-mono uppercase tracking-widest mb-0.5 text-gray-700">{label}</p>
                                        <p className="text-[10px] font-mono text-gray-600">{value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── BOTTOM ACCENT LINE ── */}
            <div className="h-px" style={{ background: `linear-gradient(to right, transparent, ${theme.accent}40, transparent)` }} />
        </div>
    );
}

export default CharacterDetailPage;