import { useState, useEffect } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Toast from "react-bootstrap/Toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
// Context 
import { useAudio } from "../../context/AudioContext";
// Importamos los componentes necesarios
import VolumeControl from "../listSongs/VolumeControl";
import AddSongButton from "../listSongs/AddSong";

// Barra de búsqueda de canciones, más la barra de volumen. 
const SearchBar = ({ token }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [customMessage, setCustomMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  const { toggleAudio, isPlaying, currentAudio } = useAudio();

  const showMessage = (message) => {
    setCustomMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleSearch = async () => {
    if (!query) return;

    try {
      const response = await axios.get("https://api.spotify.com/v1/search", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          q: query,
          type: "track",
          limit: 5,
        },
      });
      setResults(response.data.tracks.items);
      setError(null);
    } catch (err) {
      setError("Error al buscar canciones.");
      setResults([]);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSearch();
    }
  };

  // Limpia los resultados cuando el query está vacío
  useEffect(() => {
    if (query.trim() === "") {
      setResults([]);
      setError(null);
    }
  }, [query]);

  return (
    <>
      <Container fluid className="p-3">
        <Form className="d-flex justify-content-center align-items-center">
          <Form.Control
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyPress}
            style={{ width: "50dvw" }}
            size="mg"
            placeholder="Búsqueda avanzada!!!"
          />
          <Button
            variant="outline-success"
            className="ms-2"
            onClick={handleSearch}
          >
            Buscar
          </Button>
          <div>
            <VolumeControl />
          </div>
        </Form>
      </Container>

      {error && (
        <Container>
          <p className="text-danger">{error}</p>
        </Container>
      )}

      {results.length > 0 && (
        <Container>
          <Table responsive="sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Canción</th>
                <th>Artista</th>
                <th>Álbum</th>
                <th>Vista previa</th>
                <th>Agregar a Playlist</th>
              </tr>
            </thead>
            <tbody>
              {results.map((track, index) => (
                <tr key={track.id}>
                  <td>{index + 1}</td>
                  <td>{track.name}</td>
                  <td>
                    {track.artists.map((artist) => artist.name).join(", ")}
                  </td>
                  <td>{track.album.name}</td>
                  <td>
                    {track.preview_url ? (
                      <i
                        onClick={() => toggleAudio(track.preview_url)}
                        className="d-flex justify-content-center align-middle"
                      >
                        {currentAudio &&
                        currentAudio.src === track.preview_url &&
                        isPlaying ? (
                          <FontAwesomeIcon
                            icon={faPause}
                            className="text-info"
                            style={{ height: "25px" }}
                          />
                        ) : (
                          <FontAwesomeIcon
                            icon={faPlay}
                            className="text-info"
                            style={{ height: "25px" }}
                          />
                        )}
                      </i>
                    ) : (
                      <span className="text-info d-flex justify-content-center">---</span>
                    )}
                  </td>
                  <td>
                    <AddSongButton track={track} showMessage={showMessage} />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      )}

      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          minWidth: "250px",
          zIndex: 9999,
        }}
      >
        <Toast.Body className="bg-info">{customMessage}</Toast.Body>
      </Toast>
    </>
  );
};

export default SearchBar;
