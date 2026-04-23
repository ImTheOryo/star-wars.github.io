import {Route, Routes} from "react-router";
import App from "../App.tsx";
import FilmsPage from "../pages/Films/Films.tsx";
import CharactersPage from "../pages/Characters/Characters.tsx";
import PlanetsPage from "../pages/Planets/Planets.tsx";
import FilmDetailPage from "../pages/Film/Film.tsx";
import CharacterDetailPage from "../pages/Character/Character.tsx";

function Router() {
    return (
        <Routes>
            <Route
                path="/"
                element={<App/>}
            />
            <Route
                path="/films"
                element={<FilmsPage/>}
            />
            <Route
                path="/film/:filmId"
                element={<FilmDetailPage/>}
            />
            <Route
                path="/personnages"
                element={<CharactersPage/>}
            />
            <Route
                path={"/personnage/:personId"}
                element={<CharacterDetailPage/>}
            />
            <Route
                path="/planetes"
                element={<PlanetsPage/>}
            />

        </Routes>
    );
}

export default Router;