import { useState, useEffect } from "react";
import { auth } from "../services/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css";
import Logo from "../assets/logo.svg?react";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("¡Hola! Creá tu cuenta ");

  const navigate = useNavigate();

  const mensajes = [
     "¡Hola! Creá tu cuenta",
  "¿Vamos a crear tu cuenta?",
  "Escribí tu correo acá",
  "Elegí una contraseña",
  "Debes repetirla para no olvidarte"
  ];

  const [indexMensaje, setIndexMensaje] = useState(0);

  // Cambiar mensajes automáticamente
  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndexMensaje((prev) => (prev + 1) % mensajes.length);
    }, 4000);

    return () => clearInterval(intervalo);
  }, []);

  // Efecto typing
  useEffect(() => {
    let i = 0;
    const texto = mensajes[indexMensaje];

    const interval = setInterval(() => {
      setMensaje(texto.slice(0, i));
      i++;
      if (i > texto.length) clearInterval(interval);
    }, 50);

    return () => clearInterval(interval);
  }, [indexMensaje]);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      setMensaje("Ups... las contraseñas no coinciden");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err) {
      setError("Error al registrarse");
      setMensaje("Hmm... algo salió mal ");
    }
  };

  return (
    <div className="auth-wrapper">

      {/* PERSONAJE */}
      <div className="character-container">

  <div className="float">
    <img src="/Manuka-2.png" className="character-2" />
  </div>
        <div className="speech-image">
          <p>{mensaje}</p>
        </div>
      </div>

      {/* HEADER IGUAL QUE LOGIN */}
      <div className="auth-header">
        <Logo className="logo" />
        <div className="bienvenido-auth">
          <h1>Crear cuenta</h1>
        </div>
        <p>Registrate para subir tu foto</p>
      </div>

      {/* CARD */}
      <div className="auth-container">
        <form onSubmit={handleRegister} className="auth-form">
          {error && <p className="error">{error}</p>}

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