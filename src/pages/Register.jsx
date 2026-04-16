import { useState } from "react";
import { auth } from "../services/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
if (password !== confirmPassword) {
  setError("Las contraseñas no coinciden");
  return;
}

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Cuenta creada 🎉");
      navigate("/dashboard");
    } catch (error) {
      alert("Error al registrarse 😅");
    }
  };

  return (
    <div className="auth-wrapper">

      {/* PERSONAJE */}
      <div className="character-container">
        <img src="/Manuka-2.png" alt="personaje" />
      </div>

      {/* CARD */}
      <div className="auth-container">
        <img src="/logo.svg" alt="logo" className="logo" />

        <h1>Crear cuenta</h1>
        <p>Registrate para subir tu foto</p>

        <form onSubmit={handleRegister} className="auth-form">
          <input
            type="email"
            placeholder="Correo"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Contraseña"
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            type="password"
            placeholder="Confirmar contraseña"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
{error && <p className="error">{error}</p>}
          <button type="submit">Registrarse</button>
        </form>

        <p>
          ¿Ya tenés cuenta?{" "}
          <Link to="/">
            Iniciar sesión
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;