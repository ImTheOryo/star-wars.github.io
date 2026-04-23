export class Service<T> {
    apiUrl: string;
    ressource: string;

    constructor(ressource: string) {
        this.apiUrl = `https://swapi.dev/api/${ressource}`;
        this.ressource = ressource;
    }

    async getRessources(page: number = 1, search: string = ""): Promise<T[] | undefined> {
        try {
            const response = await fetch(`${this.apiUrl}?page=${page}&search=${search}`, {
                method: 'GET',
            })
            if (response.ok) {
                return await response.json();
            }
            throw new Error(response.statusText);
        } catch (error) {
            console.error(`Erreur lors de la récupération de la ressource (${this.ressource}) : ${error}`);
        }
    }
}