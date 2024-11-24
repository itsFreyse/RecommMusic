// Importamos los componentes necesarios
import Playlists from "./PlaylistUsers";
// Context 
import { useAuth } from "../../context/AuthContext";

// Componente que nos ayuda a proteger la ruta si no hay un usuario activo. 
function PlaylistsPrincipal() {
  const { user } = useAuth();
  const userId = user?.id;

  return (
    <div className="container mt-4">
      {userId ? (
        <Playlists userId={userId} />
      ) : (
        <p className="text-center">
          Por favor, inicia sesión para ver tus playlists.
        </p>
      )}
    </div>
  );
}

export default PlaylistsPrincipal;
