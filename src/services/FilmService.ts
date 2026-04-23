import {Service} from "./Service.ts";

export interface Film {
    title: string;
    episode_id: number;
    opening_crawl: string;
    director: string;
    producer: string;
    release_date: string;
    characters: Array<string>;
    planets: Array<string>;
    starships: Array<string>;
    vehicles: Array<string>;
    species: Array<string>;
    created: string;
    edited: string;
    url: string
}

export class FilmService extends Service<Film> {

    constructor() {
        const ressource: string = "films"
        super(ressource)
    }

    async getAllFilms(search: string = "", page: number = 1) {
        return await this.getRessources(page, search);
    }
}