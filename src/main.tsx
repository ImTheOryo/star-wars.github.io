import './index.css';
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from "react-router";
import Router from "./router/router.tsx";
import Header from "./components/Header.tsx";
import Providers from "./contexts/Providers.tsx";
import {CharacterContextProvider} from "./contexts/CharacterContext.tsx";
import {PlanetContextProvider} from "./contexts/PlanetContext.tsx";
import {SpeciesContextProvider} from "./contexts/SpecieContext.tsx";

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <Header/>
        <Providers
            providers={[
                <CharacterContextProvider />,
                <PlanetContextProvider />,
                <SpeciesContextProvider />,
            ]}
        >
            <Router/>
        </Providers>
    </BrowserRouter>

)
