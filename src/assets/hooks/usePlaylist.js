import { useState, useEffect, useCallback } from "react";
import axios from "axios";

function usePlaylists(userId) {
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Obtener playlists
  const fetchPlaylists = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://back-playlist-sd.onrender.com/usuarios/${userId}/playlists`
      );
      // Aplanar los datos si vienen como un array de arrays
      const flattenedData = response.data.data.flat();
      setPlaylists(flattenedData);
    } catch (err) {
      // console.error("Error al obtener las playlists:", err);
      setError(err.message || "Error al obtener las playlists.");
    } finally {
      setLoading(false);
    }
  }, [userId]);

  // Crear nueva playlist
  const addPlaylist = async (newPlaylist) => {
    try {
      const response = await axios.post(
        `https://back-playlist-sd.onrender.com/usuarios/${userId}/playlists`,
        {
          titulo: newPlaylist.titulo,
          generos: newPlaylist.generos,
        }
      );
      const createdPlaylist = response.data;
      setPlaylists((prev) => [...prev, createdPlaylist]); // Agregamos la nueva playlist
    } catch (err) {
      // console.error("Error al agregar playlist:", err);
      setError(err.message || "Error al agregar la playlist.");
    }
  };

  // Editar playlist existente
  const updatePlaylist = async (updatedPlaylist) => {
    try {
      await axios.put(
        `https://back-playlist-sd.onrender.com/usuarios/${userId}/playlists/${updatedPlaylist.id}`,
        {
          titulo: updatedPlaylist.titulo,
          generos: updatedPlaylist.generos,
        }
      );
      setPlaylists((prev) =>
        prev.map((pl) => (pl.id === updatedPlaylist.id ? updatedPlaylist : pl))
      );
    } catch (err) {
      // console.error("Error al actualizar playlist:", err);
      setError(err.message || "Error al actualizar la playlist.");
    }
  };

  // Eliminar playlist
  const deletePlaylist = async (playlistId) => {
    try {
      await axios.delete(
        `https://back-playlist-sd.onrender.com/usuarios/${userId}/playlists/${playlistId}`
      );
      setPlaylists((prev) => prev.filter((pl) => pl.id !== playlistId));
    } catch (err) {
      // console.error("Error al eliminar playlist:", err);
      setError(err.message || "Error al eliminar la playlist.");
    }
  };

  // Cargar playlists al montar
  useEffect(() => {
    fetchPlaylists();
  }, [fetchPlaylists]);

  return {
    playlists,
    selectedPlaylist,
    loading,
    error,
    setSelectedPlaylist,
    fetchPlaylists,
    addPlaylist,
    updatePlaylist,
    deletePlaylist,
  };
}

export default usePlaylists;
