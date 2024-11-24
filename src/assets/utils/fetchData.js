import axios from "axios";

// Petición a la API de Spotify para obtener máximo 30 canciones dependiendo el género elegido. 
export const fetchRecommendedTracks = async (token, genre) => {
  const response = await axios.get(
    `https://api.spotify.com/v1/recommendations?seed_genres=${genre}&limit=30`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  // Filtramos y mostramos solo las que tienen un 'preview_url'
  const filteredTracks = response.data.tracks.filter(
    (track) => track.preview_url
  );
  return filteredTracks;
};
