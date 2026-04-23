function DataRow({ label, value }: { label: string; value: string }) {
    if (!value || value === "unknown" || value === "n/a") return null;
    return (
        <div className="flex items-baseline justify-between gap-4 py-2 border-b border-yellow-500/10 group">
            <span className="text-[9px] font-mono text-yellow-700 uppercase tracking-[0.4em] shrink-0">{label}</span>
            <span className="text-white text-xs font-bold uppercase tracking-wide text-right group-hover:text-yellow-200 transition-colors duration-200">
                {value}
            </span>
        </div>
    );
}

export default DataRow