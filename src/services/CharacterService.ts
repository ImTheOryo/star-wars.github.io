import {Service} from "./Service.ts";

interface CharacterResponse {
    results: Character[];
    count: number;
}

export interface Character {
    name: string;
    height: string;
    mass: string;
    hair_color: string;
    skin_color: string;
    eye_color: string;
    birth_year: string;
    gender: "male" | "female" | "unknown" | "n/a" | "hermaphrodite" | "none";
    homeworld: string;
    films: Array<string>;
    species: Array<string>;
    vehicles: Array<string>;
    starships: Array<string>;
    created: string;
    edited: string;
    url: string;
}

export class CharacterService extends Service<CharacterResponse>{
    constructor() {
        const ressource: string = "people"
        super(ressource);
    }

    async getAllCharacters (search: string = "", page: number = 1) {
        return await this.getRessources(page, search);
    }
}