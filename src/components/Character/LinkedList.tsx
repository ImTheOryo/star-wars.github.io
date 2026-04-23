import {Link} from "react-router";
import {FaRegShareFromSquare} from "react-icons/fa6";

function LinkedList<T extends { name: string; url: string }>({
                                                                 label,
                                                                 items,
                                                                 to,
                                                             }: {
    label: string;
    items: T[];
    to: (item: T) => string;
}) {
    if (!items.length) return null;
    return (
        <div className="mt-4">
            <p className="text-[9px] font-mono text-yellow-700 tracking-[0.4em] uppercase mb-2">{label}</p>
            <ul className="space-y-1">
                {items.map((item) => (
                    <li key={item.url}>
                        <Link
                            to={to(item)}
                            className="flex items-center justify-between text-[11px] font-mono text-gray-400 px-3 py-1.5
                                border-l border-yellow-500/20 ml-2 hover:text-yellow-300 hover:border-yellow-500
                                transition-colors duration-200 group"
                        >
                            <span>{item.name}</span>
                            <FaRegShareFromSquare className="opacity-0 group-hover:opacity-100 text-yellow-400 text-[10px]" />
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default LinkedList