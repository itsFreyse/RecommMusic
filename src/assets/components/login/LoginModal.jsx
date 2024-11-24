import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
// Importamos los componentes necesarios
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

// Componente Modal donde se implementa el Login o el Register
function LoginModal({ show, handleClose, onLoginSuccess }) {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Autenticación</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Tabs
          id="auth-tabs"
          activeKey={activeTab}
          onSelect={(k) => setActiveTab(k)}
          className="mb-3 d-flex flex-row justify-content-evenly"
        >
          <Tab eventKey="login" title="Iniciar sesión">
            <LoginForm onLoginSuccess={onLoginSuccess} />
          </Tab>
          <Tab eventKey="register" title="Registrarte">
            <RegisterForm setActiveTab={setActiveTab} />{" "}
            {/* Pasamos setActiveTab */}
          </Tab>
        </Tabs>
      </Modal.Body>
    </Modal>
  );
}

export default LoginModal;
