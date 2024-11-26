import { useState } from "react";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import LoginModal from "../login/LoginModal";
import logo4ases from "../../img/icono4ases.png";
import "./NavBar.css";

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
        <Link to="/">
          <img id="logo" src={logo4ases} alt="Poker-logo" />
          Recomm Music
        </Link>
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/" className="nav-link">
              Canciones Recomendadas
            </Link>
          </li>
          <li>
            <Link
              to="/user-playlists"
              className={`nav-link ${!user ? "disabled-link" : ""}`}
              onClick={(e) => {
                if (!user) e.preventDefault();
              }}
            >
              PlayList
            </Link>
          </li>
          <li>
            <Link to="/about-us" className="nav-link">
              About Us
            </Link>
          </li>
        </ul>
      </nav>
      <div className="login-button">
        {user ? (
          <Dropdown>
            <Dropdown.Toggle variant="outline-light" active={user}>
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
