import {Service} from "./Service.ts";

interface StarshipResponse {
    results: Starship[];
    count: number;
}

export interface Starship {
    name: string;
    model: string;
    MGLT: string;
    cargo_capacity: string;
    consumables: string;
    cost_in_credits: string;
    crew: string;
    hyperdrive_rating: string;
    length: string;
    manufacturer: string;
    max_atmosphering_speed: string;
    passengers: string;
    films: Array<string>;
    pilots: Array<string>;
    starship_class: string;
    created: Date;
    edited: Date;
    url: string;
}

export class StarshipService extends Service<StarshipResponse>{
    constructor() {
        const ressource: string = "starships";
        super(ressource);
    }

    async getAllStarships(search: string = "", page: number = 1) {
        return await this.getRessources(page, search);
    }
}