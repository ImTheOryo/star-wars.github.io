import {Service} from "./Service.ts";

interface VehicleResponse {
    results: Vehicle[];
    count: number;
}

export interface Vehicle {
    cargo_capacity: string;
    consumables: string;
    cost_in_credits: string;
    created: Date;
    crew: string;
    edited: Date;
    length: string;
    manufacturer: string;
    max_atmosphering_speed: string;
    model: string;
    name: string;
    passengers: string;
    pilots: Array<string>;
    films: Array<string>;
    url: string;
    vehicle_class: string;
}

export class VehicleService extends Service<VehicleResponse>{
    constructor() {
        const ressource: string = "vehicles";
        super(ressource);
    }

    async getAllVehicles(search: string = "", page: number = 1) {
        return await this.getRessources(page, search);
    }
}