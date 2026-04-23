import * as React from "react";
import {useState} from "react";
import {FaChevronDown} from "react-icons/fa6";
import clsx from "clsx";

function CountBadge<T>(
    {
        label,
        count,
        elements,
        renderItem
    }:
       {
           label: string;
           count: number;
           elements: T[];
           renderItem?: (item: T, index: number) => React.ReactNode;
       })
{
    const [expanded, setExpanded] = useState(false);


    return (
        <section>
            <button
                className="flex w-full items-center justify-between border-b border-yellow-500/10 py-3 group"
                onClick={() => setExpanded(!expanded)}
            >
                <div className="flex items-center gap-3">
                    <div className="w-1 h-4 bg-yellow-500/40 group-hover:bg-yellow-500 transition-colors duration-300" />
                    <span className="text-[11px] font-mono text-gray-400 uppercase tracking-[0.3em]">{label}</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="h-px w-8 bg-yellow-500/20" />
                    <span className="text-yellow-400 font-black text-sm font-mono">{String(count).padStart(2, "0")}</span>
                    <FaChevronDown
                        className={clsx(
                            { "rotate-180 transition-transform": expanded },
                            { "transition-transform": !expanded },
                            "text-yellow-400 font w-4 h-4"
                        )}
                    />
                </div>
            </button>

            {expanded && elements && elements.length > 0 && (
                <ul className="py-2 space-y-1 max-h-28 overflow-y-auto scrollbar-thin scrollbar-track-black/40 scrollbar-thumb-yellow-500/40 hover:scrollbar-thumb-yellow-500/70">
                    {elements.map((item, index) => (
                        <li key={index} className="text-[11px] font-mono text-gray-400 px-3 py-1 border-l border-yellow-500/20 ml-2 hover:text-yellow-300 hover:border-yellow-500 transition-colors duration-200">
                            {renderItem ? renderItem(item, index) : String(item)}
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}

export default CountBadge