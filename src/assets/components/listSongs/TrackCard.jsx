import { useState } from "react";
import Card from "react-bootstrap/Card";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
// Context
import { useAudio } from "../../context/AudioContext";
// Componente
import AddSongButton from "./AddSong";

// Componente para mostrar toda la información de la canción
const TrackCard = ({ track }) => {
  const { toggleAudio, isPlaying, currentAudio } = useAudio();
  const [showToast, setShowToast] = useState(false);
  const [customMessage, setCustomMessage] = useState("");

  const handleTogglePreview = () => {
    toggleAudio(track.preview_url);
  };

  const showMessage = (message) => {
    setCustomMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const cardStyle = {
    width: "15rem",
    border: "1px solid #ddd",
    borderRadius: "8px",
    position: "relative",
    transition: "all 0.3s ease",
  };

  const hoverStyle = {
    borderColor:
      isPlaying && currentAudio?.src === track.preview_url ? "#0d6efd" : "#ddd",
    boxShadow:
      isPlaying && currentAudio?.src === track.preview_url
        ? "0 0 10px rgba(13, 110, 253, 0.5)"
        : "none",
  };

  return (
    <div>
      <ToastContainer
        position="bottom-end"
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 9999,
        }}
      >
        {showToast && (
          <Toast
            onClose={() => setShowToast(false)}
            delay={3000}
            autohide
            bg="warning"
          >
            <Toast.Body>{customMessage}</Toast.Body>
          </Toast>
        )}
      </ToastContainer>

      <Card style={{ ...cardStyle, ...hoverStyle }} className="track-card">
        <Card.Header
          className="d-flex justify-content-between align-items-center"
          style={{
            background: "transparent",
            borderBottom: "none",
            padding: "0.5rem 1rem",
          }}
        >
          <Card.Title
            className="fs-6 fw-bold"
            style={{
              maxWidth: "9rem",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {track.name}
          </Card.Title>
          <AddSongButton track={track} showMessage={showMessage} />
        </Card.Header>
        <Card.Body
          style={{
            background: "transparent",
            borderTop: "none",
            padding: "0 1rem",
          }}
        >
          <Card.Text
            style={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 1,
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            <strong>Artista: </strong>
            {track.artists
              .slice(0, 1)
              .map((a) => a.name)
              .join(", ")}
            {track.artists.length > 1 && ", otros."}
          </Card.Text>
          <img
            src={track.album.images[1].url}
            alt={track.name}
            style={{
              width: "100%",
              height: "auto",
              borderRadius: "8px",
              objectFit: "cover",
            }}
          />
          {track.preview_url && (
            <div
              onClick={handleTogglePreview}
              className="d-flex justify-content-center align-items-center"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                backgroundColor: "rgba(0, 0, 0, 0.6)",
                borderRadius: "50%",
                width: "80px",
                height: "80px",
                cursor: "pointer",
              }}
            >
              <FontAwesomeIcon
                icon={
                  isPlaying && currentAudio?.src === track.preview_url
                    ? faPause
                    : faPlay
                }
                style={{ color: "#fff", fontSize: "40px" }}
              />
            </div>
          )}
        </Card.Body>
        <Card.Footer
          style={{
            background: "transparent",
            borderTop: "none",
            padding: "0.5rem 1rem",
          }}
        >
          <p
            className="text-muted"
            style={{
              maxWidth: "18rem",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            <strong>Álbum:</strong> {track.album.name}
          </p>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default TrackCard;
