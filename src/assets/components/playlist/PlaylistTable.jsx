import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Toast from "react-bootstrap/Toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

// Componente para mostrar las playlist que tiene el usuario. 
function PlaylistTable({ playlists, onSelect, onEdit, onDelete }) {
  const [renderPlaylists, setRenderPlaylists] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [selectedPlaylistId, setSelectedPlaylistId] = useState(null);

  useEffect(() => {
    const validPlaylists = playlists.filter((playlist) => playlist.id);
    setRenderPlaylists(validPlaylists);
  }, [playlists]);

  const handleDeleteClick = (id) => {
    setSelectedPlaylistId(id); // Guardar el ID de la playlist
    setShowModal(true); // Mostrar el modal de confirmación
  };

  const confirmDelete = () => {
    if (selectedPlaylistId) {
      onDelete(selectedPlaylistId); // Eliminar playlist
      setShowToast(true); // Mostrar notificación
    }
    setShowModal(false); // Cerrar el modal
  };

  const cancelDelete = () => {
    setSelectedPlaylistId(null); // Limpiar selección
    setShowModal(false); // Cerrar el modal
  };

  const handleSelect = (playlist) => {
    setSelectedPlaylistId(playlist.id); // Establecer la playlist seleccionada
    onSelect(playlist); // Llamar a la función onSelect pasada como prop
  };

  return (
    <Container>
      {/* Si no hay playlists, mostramos un mensaje */}
      {renderPlaylists.length === 0 ? (
        <p className="text-center text-muted">
          No tienes playlists disponibles.
        </p>
      ) : (
        <Row className="d-grid gap-2">
          {renderPlaylists.map((playlist) => (
            <Button
              key={playlist.id}
              className={`d-flex justify-content-between align-items-center border rounded p-2 ${
                selectedPlaylistId === playlist.id ? "active" : ""
              }`}
              style={{ cursor: "pointer" }}
              onClick={() => handleSelect(playlist)}
              variant={selectedPlaylistId === playlist.id && "outline-info"}
            >
              <Col sm={10} className="d-flex flex-column align-items-start">
                <h2 className="fs-6 fw-bold mb-1">{playlist.titulo}</h2>
                <span className="fs-6 text-muted">{playlist.generos}</span>
              </Col>
              <Col sm={2} className="d-flex justify-content-end gap-3">
                <FontAwesomeIcon
                  icon={faEdit}
                  className="text-primary"
                  style={{
                    cursor: "default",
                    padding: "0.5rem",
                    height: "3dvh",
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(playlist);
                  }}
                  aria-label={`Editar ${playlist.titulo}`}
                />
                <FontAwesomeIcon
                  icon={faTrash}
                  className="text-danger"
                  style={{
                    cursor: "default",
                    padding: "0.5rem",
                    height: "3dvh",
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteClick(playlist.id);
                  }}
                  aria-label={`Eliminar ${playlist.titulo}`}
                />
              </Col>
            </Button>
          ))}
        </Row>
      )}

      {/* Modal de Confirmación */}
      <Modal show={showModal} onHide={cancelDelete} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que deseas eliminar esta playlist? Esta acción no se
          puede deshacer.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelDelete}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Toast de Notificación */}
      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        delay={3000}
        autohide
        className="position-fixed bottom-0 end-0 m-3"
      >
        <Toast.Header>
          <strong className="me-auto">Notificación</strong>
        </Toast.Header>
        <Toast.Body>La playlist ha sido eliminada con éxito.</Toast.Body>
      </Toast>
    </Container>
  );
}

export default PlaylistTable;
