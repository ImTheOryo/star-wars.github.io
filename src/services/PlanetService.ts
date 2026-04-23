import {Service} from "./Service.ts";


interface PlanetResponse {
    results: Planets[];
    count: number;
}

export interface Planets {
    name: string;
    rotation_period?: string;
    orbital_period?: string;
    diameter?: string;
    climate?: string;
    gravity?: string;
    terrain?: string;
    surface_water?: string;
    population?: string;
    residents?: Array<string>;
    films?: Array<string>;
    created?: string;
    edited?: string;
    url: string;
}

export class PlanetService extends Service<PlanetResponse>{
    constructor() {
        const ressource: string = "planets";
        super(ressource);
    }

    async getAllPlanets(search: string = "", page: number = 1){
        const data = await this.getRessources(page, search);
        return data;
    }
}