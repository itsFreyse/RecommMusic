import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBackward,
  faHeartCirclePlus,
} from "@fortawesome/free-solid-svg-icons";
// Importamos los componentes necesarios. 
import PlaylistTable from "./PlaylistTable";
import PlaylistDetails from "./PlaylistDetails";
import PlaylistModal from "./PlaylistModal";
// Hooks 
import usePlaylists from "../../hooks/usePlaylist";

// Componente principal donde se tienen las playlists y sus canciones. 
const Playlists = ({ userId }) => {
  const {
    playlists,
    selectedPlaylist,
    fetchPlaylists,
    addPlaylist,
    updatePlaylist,
    deletePlaylist,
    setSelectedPlaylist,
  } = usePlaylists(userId);

  const [showModal, setShowModal] = useState(false);
  const [editingPlaylist, setEditingPlaylist] = useState(null);

  const handleShowModal = (playlist = null) => {
    setEditingPlaylist(playlist);
    setShowModal(true);
  };

  const handleHideModal = () => {
    setShowModal(false);
    setEditingPlaylist(null);
  };

  const handleCreateOrEdit = async (playlist) => {
    if (playlist.id) {
      // Editar playlist
      await updatePlaylist(playlist);
    } else {
      // Crear nueva playlist
      await addPlaylist(playlist);
    }
    fetchPlaylists(); // Refrescamos las playlists después de guardar
  };

  return (
    <div className="row">
      <div className="col-md-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="d-flex align-items-center gap-2">
            <FontAwesomeIcon
              icon={faBackward}
              className="text-primary mb-1"
              style={{ cursor: "pointer" }}
            />
            <h3 className="fs-4 fw-bold">Mis Playlists</h3>
          </div>
          <FontAwesomeIcon
            icon={faHeartCirclePlus}
            className="text-info"
            style={{ height: "4dvh", cursor: "pointer" }}
            onClick={() => handleShowModal()}
          />
        </div>

        <PlaylistTable
          playlists={playlists}
          onSelect={setSelectedPlaylist}
          onEdit={handleShowModal}
          onDelete={deletePlaylist}
        />
      </div>

      <div className="col-md-8">
        <PlaylistDetails playlist={selectedPlaylist} />
      </div>

      {showModal && (
        <PlaylistModal
          show={showModal}
          onHide={handleHideModal}
          onSave={handleCreateOrEdit}
          playlist={editingPlaylist}
        />
      )}
    </div>
  );
};

export default Playlists;
