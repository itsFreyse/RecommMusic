import { useState, useEffect, useRef } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";
// Context
import { useAuth } from "../../context/AuthContext";
// Hooks
import usePlaylists from "../../hooks/usePlaylist";
import useSongs from "../../hooks/useSongs";

// Componente para agregar canciones a una playlist (Contiene la funcionalidad)
const AddSongButton = ({ track, showMessage }) => {
  const { user } = useAuth();
  const { playlists } = usePlaylists(user?.id);
  const { addTrackToPlaylist } = useSongs();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleIconClick = () => {
    if (!user) {
      showMessage("Por favor inicia sesión para agregar canciones.");
    } else if (playlists.length === 0) {
      showMessage("No tienes playlists disponibles.");
    } else {
      setShowDropdown(!showDropdown);
    }
  };

  const handleAddToPlaylist = (playlistId) => {
    addTrackToPlaylist(track, playlistId);
    setShowDropdown(false);
    showMessage("Canción agregada exitosamente.");
  };

  return (
    <div ref={dropdownRef}>
      <DropdownButton
        id="dropdown-basic-button"
        title={
          <FontAwesomeIcon
            icon={faSquarePlus}
            className="text-info dropdown-toggle"
            style={{ height: "30px" }}
          />
        }
        variant="outline-light"
        size="sm"
        style={{ height: "50px", width: "50px" }}
        show={showDropdown}
        onClick={handleIconClick}
      >
        {playlists.map((playlist) => (
          <Dropdown.Item
            key={playlist.id}
            onClick={() => handleAddToPlaylist(playlist.id)}
          >
            {playlist.titulo}
          </Dropdown.Item>
        ))}
      </DropdownButton>
    </div>
  );
};

export default AddSongButton;
