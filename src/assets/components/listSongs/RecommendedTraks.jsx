import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
// Componentes
import TrackCard from "./TrackCard";
import GenreSelector from "./GenreSelector";
// Utils
import { fetchRecommendedTracks } from "../../utils/fetchData.js";

// Componente 
const RecommendedTracks = ({ token }) => {
  const [tracks, setTracks] = useState([]);
  const [genre, setGenre] = useState("pop");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Función para obtener tracks recomendados y filtrar solo las que tienen preview_url
  const loadTracks = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchRecommendedTracks(token, genre);
      const filteredTracks = data.filter((track) => track.preview_url);
      setTracks(filteredTracks);
      localStorage.setItem(genre, JSON.stringify(data));
    } catch (error) {
      setError("Error al obtener canciones.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const cachedRecommendations = localStorage.getItem(genre);

    if (cachedRecommendations) {
      setTracks(JSON.parse(cachedRecommendations));
    } else {
      loadTracks();
    }
  }, [genre, token]);

  return (
    <Container fluid>
      <div className="row p-3">
        <div className="col-6">
          <h1 className="fs-4 fw-bold" style={{ color: "#2B2B2B" }}>
            Canciones Recomendadas para {genre}
          </h1>
        </div>
        <div className="col-6">
          <Button onClick={loadTracks} variant="outline-primary">
            {loading ? "Cargando..." : "Recargar Recomendaciones"}
          </Button>
        </div>
      </div>
      <GenreSelector genre={genre} setGenre={setGenre} />
      {loading && <p>Cargando canciones...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "16px",
            justifyContent: "center",
          }}
        >
          {tracks.map((track) => (
            <TrackCard key={track.id} track={track} />
          ))}
        </div>
      )}
    </Container>
  );
};

export default RecommendedTracks;
