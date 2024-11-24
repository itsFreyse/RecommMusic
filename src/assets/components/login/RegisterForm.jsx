import { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Alert from "react-bootstrap/Alert";

// Componente para registrar un nuevo usuario
function RegisterForm({ setActiveTab }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    termsAccepted: false,
  });

  const [userResponse, setUserResponse] = useState(null); // Almacenar datos del backend
  const [errorMessage, setErrorMessage] = useState(""); // Almacenar errores

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.termsAccepted) {
      setErrorMessage("Debes aceptar los términos y condiciones.");
      return;
    }

    try {
      const response = await axios.post(
        "https://back-playlist-sd.onrender.com/usuarios",
        {
          nombre: formData.name,
          correo: formData.email,
          contrasena: formData.password,
        }
      );

      setUserResponse(response.data); // Guardamos la respuesta del backend
      setErrorMessage(""); // Limpiamos errores

      // Cambiar a la pestaña de "Iniciar sesión" tras un registro exitoso
      setActiveTab("login");
    } catch (error) {
      console.error("Error al registrar:", error);
      setErrorMessage(
        error.response?.data?.message || "Error al registrar. Intenta de nuevo."
      );
      setUserResponse(null); // Limpiamos cualquier dato previo
    }
  };

  return (
    <>
      <div className="text-center mb-3">
        <p>Regístrate</p>
      </div>

      <Form onSubmit={handleSubmit}>
        <FloatingLabel controlId="registerName" label="Nombre" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Enter name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </FloatingLabel>

        <FloatingLabel controlId="registerEmail" label="Email" className="mb-3">
          <Form.Control
            type="email"
            placeholder="name@example.com"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </FloatingLabel>

        <FloatingLabel
          controlId="registerPassword"
          label="Password"
          className="mb-3"
        >
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </FloatingLabel>

        <div className="d-flex justify-content-center mb-4">
          <Form.Check
            type="checkbox"
            label="Acepto los términos y condiciones."
            name="termsAccepted"
            checked={formData.termsAccepted}
            onChange={handleChange}
          />
        </div>

        <Button variant="primary" className="mb-4 w-100" type="submit">
          Registrarte
        </Button>
      </Form>

      {errorMessage && (
        <Alert variant="warning" className="mt-3">
          {errorMessage}
        </Alert>
      )}

      {userResponse && (
        <Alert variant="success" className="mt-3">
          <h4>¡Registro Exitoso!</h4>
          <p>Ahora puedes iniciar sesión con tus credenciales.</p>
        </Alert>
      )}
    </>
  );
}

export default RegisterForm;
