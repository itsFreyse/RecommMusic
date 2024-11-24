import { useState, useEffect } from "react";
import axios from "axios";
import { Toast } from "react-bootstrap";

function useSongs(playlistId) {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [alertType, setAlertType] = useState(null); 

  useEffect(() => {
    if (!playlistId) return;

    // Limpiamos el estado anterior antes de cargar los nuevos datos
    setSongs([]);
    setError(null);

    const fetchSongs = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://back-playlist-sd.onrender.com/playlists/${playlistId}/canciones`
        );
        setSongs(response.data.data);
      } catch (err) {
        setError("Error al obtener canciones", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSongs();
  }, [playlistId]);

  // Función para agregar canción a la playlist
  const addTrackToPlaylist = async (track, playlistId) => {
    // console.log("track:", track);
    // console.log("playlistId:", playlistId);

    try {
      const artistNames =
        track.artists && Array.isArray(track.artists)
          ? track.artists.map((a) => a.name).join(", ")
          : "Desconocido"; // Valor por defecto si no se encuentran artistas

      const releaseDate = track.album.release_date; // Ejemplo: "2024-05-20"
      const formattedDate = releaseDate ? releaseDate : "0000-00-00"; // Default date if not available

      // console.log("Sending track data:", {
      //   nombre: track.name,
      //   artista: artistNames,
      //   anioSalida: formattedDate,
      //   disco: track.album.name,
      // });

      // Enviar la canción a la playlist seleccionada
      await axios.post(
        `https://back-playlist-sd.onrender.com/playlists/${playlistId}/canciones`,
        {
          nombre: track.name,
          artista: artistNames,
          anioSalida: formattedDate,
          disco: track.album.name,
        }
      );

      // Mostrar mensaje de éxito con Toast
      setMessage(
        `La canción "${track.name}" se agregó a la playlist correctamente.`
      );
      setAlertType("success");
    } catch (error) {
      // console.error("Error al agregar la canción a la playlist:", error);

      // Mostrar mensaje de error con Toast
      setMessage(
        "Hubo un error al agregar la canción. Por favor, intenta de nuevo."
      );
      setAlertType("danger");
    }
  };

  // Función para eliminar una canción de la playlist
  const deleteTrackFromPlaylist = async (trackId, playlistId) => {
    try {
      // Llamamos al endpoint para eliminar la canción de la playlist
      await axios.delete(
        `https://back-playlist-sd.onrender.com/playlists/${playlistId}/canciones/${trackId}`
      );

      // Actualizamos la lista de canciones después de la eliminación
      setSongs(songs.filter((song) => song.id !== trackId));

      // Mostrar mensaje de éxito con Toast
      setMessage("La canción se eliminó correctamente.");
      setAlertType("success");
    } catch (error) {
      // console.error("Error al eliminar la canción:", error);

      // Mostrar mensaje de error con Toast
      setMessage(
        "Hubo un error al eliminar la canción. Por favor, intenta de nuevo."
      );
      setAlertType("danger");
    }
  };

  return {
    songs,
    loading,
    error,
    message,
    alertType,
    addTrackToPlaylist,
    deleteTrackFromPlaylist,
  };
}

export default useSongs;
