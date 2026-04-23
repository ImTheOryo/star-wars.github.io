function StatBlock({ label, value }: { label: string; value: string | number }) {
    return (
        <div className="relative border border-yellow-500/20 p-4 bg-black/40 overflow-hidden group">
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-yellow-500/60" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-yellow-500/60" />
            <p className="text-[9px] font-mono text-yellow-700 tracking-[0.4em] uppercase mb-1">{label}</p>
            <p className="text-white font-bold text-sm uppercase tracking-wide group-hover:text-yellow-200 transition-colors duration-300">
                {value}
            </p>
        </div>
    );
}

export default StatBlock;