// Importamos axios para realizar la petición a la API
import axios from "axios";

// Credenciales de acceso
const CLIENT= import.meta.env.VITE_CLIENT_ID;
const C_SECRET = import.meta.env.VITE_CLIENT_SECRET;

// Función para poder realizar peticiones a la API de Spotify. 
const getSpotifyToken = async () => {
  const response = await axios.post(
    "https://accounts.spotify.com/api/token",
    new URLSearchParams({
      grant_type: "client_credentials",
    }),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + btoa(`${CLIENT}` + ":" + `${C_SECRET}`),
      },
    }
  );
  return response.data.access_token;
};

export default getSpotifyToken;
