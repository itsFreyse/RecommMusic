import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

// Componente donde se guarda el formulario para crear una playlist o editarla. 
function PlaylistModal({ show, onHide, onSave, playlist }) {
  const [titulo, setTitulo] = useState("");
  const [generos, setGeneros] = useState("");

  useEffect(() => {
    if (playlist) {
      setTitulo(playlist.titulo || "");
      setGeneros(playlist.generos || "");
    } else {
      setTitulo("");
      setGeneros("");
    }
  }, [playlist]);

  const handleSubmit = () => {
    const newPlaylist = {
      id: playlist?.id || null, // Si existe id, es edición; si no, es creación.
      titulo,
      generos,
    };
    onSave(newPlaylist); // Llamamos la función onSave del padre
    onHide(); // Cerramos el modal
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>
          {playlist?.id ? "Editar Playlist" : "Crear Playlist"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formTitulo">
            <Form.Label>Título</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nombre de la playlist"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formGeneros" className="mt-3">
            <Form.Label>Géneros</Form.Label>
            <Form.Control
              type="text"
              placeholder="Géneros separados por coma"
              value={generos}
              onChange={(e) => setGeneros(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default PlaylistModal;
