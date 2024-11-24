import { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";

// Componente Login con su respectiva funcionalidad
function LoginForm({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email || !password) {
      setErrorMessage("Por favor, llena todos los campos.");
      return;
    }

    try {
      const response = await axios.post(
        "https://back-playlist-sd.onrender.com/login",
        { email, contrasena: password }
      );

      const { data } = response.data;

      if (data && data.validation === true) {
        const user = { 
          id: data.id, 
          name: data.nombre 
        };
        // Guardamos datos en localStorage
        localStorage.setItem("user", JSON.stringify(user));

        // Notifica al componente padre
        onLoginSuccess(user); 
      } else {
        setErrorMessage("Credenciales incorrectas.");
      }
    } catch (error) {
      console.error("Error en la autenticación:", error);

      if (error.response) {
        setErrorMessage(
          error.response.data.message || "Error en la autenticación."
        );
      } else if (error.request) {
        setErrorMessage("No se pudo conectar con el servidor.");
      } else {
        setErrorMessage("Ocurrió un error inesperado.");
      }
    }
  };

  return (
    <Form onSubmit={handleLogin}>
      <FloatingLabel
        controlId="floatingEmail"
        label="Correo Electrónico"
        className="mb-3"
      >
        <Form.Control
          type="email"
          placeholder="usuario@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FloatingLabel>
      <FloatingLabel
        controlId="floatingPassword"
        label="Contraseña"
        className="mb-3"
      >
        <Form.Control
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FloatingLabel>

      {errorMessage && (
        <p className="text-danger text-center">{errorMessage}</p>
      )}

      <Button variant="primary" type="submit" className="mb-4 w-100">
        Iniciar sesión
      </Button>
    </Form>
  );
}

export default LoginForm;
