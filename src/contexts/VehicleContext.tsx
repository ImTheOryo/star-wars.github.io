import * as React from "react";
import {type Vehicle, VehicleService} from "../services/VehicleService.ts";
import {createContext, useContext, useEffect, useState} from "react";

interface VehicleContextType {
    vehicles: Vehicle[];
    loading: boolean;
    count: number;
    search: (query: string, page: number) => void;
}

const VehicleContext = createContext<VehicleContextType | null>(null);

interface CharacterProviderProps {
    children?: React.ReactNode;
}

export function VehicleProvider({ children }: CharacterProviderProps) {
    const [vehicles, setVehicles] = useState<Vehicle[]>([])
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(false);

    const service = new VehicleService();

    const search = async (query: string, page: number = 1) => {
        setLoading(true);

        let total = 0

        do {
            const data = await service.getAllVehicles(query, page);

            setVehicles((prev) => [...prev, ...(data?.results || [])]);
            setCount(data?.count ?? 0)
            total = data?.count ?? 0;
            page += 1;

        } while (page <= Math.ceil(total / 10));


        setLoading(false);
    };

    useEffect(() => { search("", 1); }, []);

    return (
        <VehicleContext.Provider value={{ vehicles, loading, search, count }}>
            {children}
        </VehicleContext.Provider>
    )
}

export function useVehicle() {
    const context = useContext(VehicleContext);
    if (!context) throw new Error("useVehicle must be used within VehicleContext");
    return context;
}