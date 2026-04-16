import { useState } from "react";
import { auth } from "../services/firebase";
import { Link } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import Register from "./Register";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();
const [error, setError] = useState("");
  const handleLogin = async (e) => {
  e.preventDefault();

  try {
    await signInWithEmailAndPassword(auth, email, password);
    navigate("/dashboard");

  } catch (err) {
    console.log(err.code);

    if (err.code === "auth/user-not-found") {
      setError("El usuario no existe 😢");
    } else if (err.code === "auth/wrong-password") {
      setError("Contraseña incorrecta 🔒");
    } else if (err.code === "auth/invalid-email") {
      setError("Correo inválido 📧");
    } else {
      setError("Error al iniciar sesión 😅");
    }
  }
};

  const handleGoogleLogin = async () => {
    await signInWithPopup(auth, provider);
    navigate("/dashboard");
  };

 
  return (
  <div className="auth-wrapper">

    {/* PERSONAJE */}
    <div className="character-container">
      <img src="Manuka.png" alt="personaje" />
      
    </div>

    {/* CARD LOGIN */}
    <div className="auth-container">
      <img src="logo.svg" alt="logo" className="logo" />

      <h1>Bienvenido</h1>
      <p>Ingresá para subir tu foto</p>

      <form onSubmit={handleLogin} className="auth-form">
        {error && <p className="error">{error}</p>}
        <input type="email" placeholder="Correo" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Contraseña" onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Ingresar</button>
      </form>

      <div className="divider">o</div>

      <button className="google-btn" onClick={handleGoogleLogin}>
        Iniciar con Google
      </button>

      <p>
        ¿No tienes cuenta?{" "}
        <Link to="/register">
          Registrate
        </Link>
      </p>
    </div>

  </div>
);
};

export default Login;