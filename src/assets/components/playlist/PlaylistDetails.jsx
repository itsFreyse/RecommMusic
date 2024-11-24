import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import Modal from "react-bootstrap/Modal";
// Hooks
import useSongs from "../../hooks/useSongs.js";

// Componente donde se muestran las canciones de cada una de las playlist, según la seleccionada. 
function PlaylistDetails({ playlist }) {
  const { songs, loading, error, deleteTrackFromPlaylist } = useSongs(
    playlist?.id
  );
  const [isLoading, setIsLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState(""); 
  const [toastType, setToastType] = useState("");
  const [showToast, setShowToast] = useState(false); 
  const [showModal, setShowModal] = useState(false); 
  const [selectedSongId, setSelectedSongId] = useState(null); // ID de la canción a eliminar

  useEffect(() => {
    if (playlist) {
      setIsLoading(true);
    }
  }, [playlist]);

  useEffect(() => {
    if (!loading) {
      setIsLoading(false);
    }
  }, [loading, error]);

  const openModal = (songId) => {
    setSelectedSongId(songId); // Guardar ID de la canción
    setShowModal(true); // Mostrar el modal
  };

  const confirmDelete = async () => {
    try {
      // Llamar a la función para eliminar la canción
      await deleteTrackFromPlaylist(selectedSongId, playlist.id);

      // Configurar mensaje y mostrar el toast
      setToastMessage("La canción se eliminó correctamente.");
      setToastType("success");
      setShowToast(true);
    } catch (error) {
      // Configurar mensaje en caso de error
      setToastMessage("Hubo un error al eliminar la canción.");
      setToastType("danger");
      setShowToast(true);
    } finally {
      setShowModal(false); // Cerrar el modal
      setSelectedSongId(null); // Limpiar la selección
    }
  };

  const cancelDelete = () => {
    setShowModal(false); // Cerrar el modal
    setSelectedSongId(null); // Limpiar la selección
  };

  if (!playlist) {
    return (
      <p className="text-center text-muted">
        Selecciona una playlist para ver los detalles.
      </p>
    );
  }

  return (
    <div className="container">
      {/* Card para los detalles de la playlist */}
      <Card className="mb-3 shadow-lg border-1">
        <Card.Body>
          <Row>
            <Col sm={12} md={6}>
              <Card.Title className="fs-3 text-primary">
                {playlist.titulo}
              </Card.Title>
              <Card.Text className="text-muted">
                <strong>Géneros:</strong> {playlist.generos}
              </Card.Text>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Toast de Bootstrap */}
      <ToastContainer position="top-end" className="p-3">
        <Toast
          show={showToast}
          onClose={() => setShowToast(false)}
          bg={toastType}
          delay={3000}
          autohide
        >
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>

      <h5 className="text-muted mb-3">Canciones:</h5>

      {/* Mostrar si está cargando */}
      {isLoading ? (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : error ? (
        <p className="text-center text-muted">
          Agrega canciones para disfrutar del contenido!
        </p>
      ) : songs.length > 0 ? (
        <Table
          responsive
          className="table-light shadow-sm rounded-3 table-hover"
        >
          <thead className="bg-soft-primary">
            <tr>
              <th>Nombre</th>
              <th>Artista</th>
              <th>Album</th>
              <th>Año de Salida</th>
              <th>Agregada</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {songs.map((song) => (
              <tr key={song.id}>
                <td>{song.nombre}</td>
                <td>{song.artista}</td>
                <td>{song.disco}</td>
                <td>{song.anioSalida}</td>
                <td>{song.fechaAgregada}</td>
                <td>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => openModal(song.id)}
                  >
                    Borrar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p className="text-center text-muted">
          No hay canciones en esta playlist.
        </p>
      )}

      {/* Modal de Confirmación */}
      <Modal show={showModal} onHide={cancelDelete} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que deseas eliminar esta canción? Esta acción no se
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
    </div>
  );
}

export default PlaylistDetails;
