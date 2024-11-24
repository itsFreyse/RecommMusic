import { useState } from "react";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
// Context
import { useAuth } from "../../context/AuthContext";
// Importamos los componentes necesarios
import LoginModal from "../login/LoginModal";
// Importamos el logo
import logo4ases from "../../img/icono4ases.png";
// Estilos de este componente
import "./NavBar.css";

// Nav del sitio web 
function NavigatorBar() {
  const { user, login, logout } = useAuth();
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleLoginSuccess = (user) => {
    login(user);
    setShowModal(false);
  };

  return (
    <header>
      <div className="logo">
        <a href="/">
          <img id="logo" src={logo4ases} alt="Poker-logo" />
          Recomm Music
        </a>
      </div>
      <nav>
        <ul>
          <li>
            <a href="/" className="nav-link">
              Canciones Recomendadas
            </a>
          </li>
          <li>
            <a
              href="/user-playlists"
              className={`nav-link ${!user ? "disabled-link" : ""}`}
              onClick={(e) => {
                if (!user) e.preventDefault();
              }}
            >
              PlayList
            </a>
          </li>
          <li>
            <a href="#" className="nav-link">
              About Us
            </a>
          </li>
        </ul>
      </nav>
      <div className="login-button">
        {user ? (
          <Dropdown>
            <Dropdown.Toggle 
              variant="outline-light" 
              active={user}
            >
              {user.name}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={logout}>Cerrar sesión</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        ) : (
          <Button variant="outline-dark" onClick={handleShow}>
            Inicio de sesión
          </Button>
        )}
      </div>
      <LoginModal
        show={showModal}
        handleClose={handleClose}
        onLoginSuccess={handleLoginSuccess}
      />
    </header>
  );
}

export default NavigatorBar;
