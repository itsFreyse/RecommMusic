import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Container from "react-bootstrap/Container";
// Importamos todos los componentes necesarios para que la APP funcione.
import NavegationBar from "./assets/components/navBar/NavBar.jsx";
import PlaylistsPrincipal from "./assets/components/playlist/PlaylistPrincipal.jsx";
import RecommendedTracks from "./assets/components/listSongs/RecommendedTraks.jsx";
import SearchBar from "./assets/components/searchBar/SearchBar.jsx";
import AboutUs from "./assets/components/AboutUs/AboutUs.jsx";
// Importamos el servicio
import getSpotifyToken from "./assets/services/spotify.js";

function App() {
  const [token, setToken] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchToken = async () => {
      const accessToken = await getSpotifyToken();
      setToken(accessToken);
    };

    fetchToken();
  }, []);

  if (!token) return <p>Loading...</p>;

  return (
    <BrowserRouter>
      <Container fluid style={{ fontFamily: "Optima" }}>
        <NavegationBar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <SearchBar token={token} /> <RecommendedTracks token={token} />
              </>
            }
          />
          <Route path="/user-playlists" element={<PlaylistsPrincipal />} />
          <Route path="/about-us" element={<AboutUs />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
