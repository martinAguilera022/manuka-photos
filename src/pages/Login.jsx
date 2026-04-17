import {useEffect, useState } from "react";

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
import Logo from "../assets/logo.svg?react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();
const [error, setError] = useState("");
const [mensaje, setMensaje] = useState("");
const mensajes = [
  "¡Hola! Ingresá tus datos ",
  "Podés iniciar con Google también ",
  "No compartas tu contraseña ",
  "Si no tenés cuenta, registrate "
];
const [indexMensaje, setIndexMensaje] = useState(0);

useEffect(() => {
  const intervalo = setInterval(() => {
    setIndexMensaje((prev) => (prev + 1) % mensajes.length);
  }, 4000); // cambia cada 4 segundos

  return () => clearInterval(intervalo);
}, []);
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
const handleLogin = async (e) => {
  e.preventDefault();

  try {
    await signInWithEmailAndPassword(auth, email, password);
    navigate("/dashboard");

  } catch (err) {
    console.log(err.code);

    if (err.code === "auth/user-not-found") {
      setError("El usuario no existe");
      setMensaje("Hmm... no encuentro ese usuario");
    } else if (err.code === "auth/wrong-password") {
      setError("Contraseña incorrecta 🔒");
      setMensaje("Creo que la contraseña es incorrecta");
    } else if (err.code === "auth/invalid-email") {
      setError("Correo inválido 📧");
      setMensaje("Hmm... ese correo no parece válido crea una cuenta");

    } else {
      setError("Error al iniciar sesión");
      setMensaje("Hmm... parece que hubo un error");
    }
  }
};

  const handleGoogleLogin = async () => {
    await signInWithPopup(auth, provider);
    navigate("/dashboard");
  };

  const textoCompleto = "¡Hola! Ingresá tus datos";
useEffect(() => {
  const handleScroll = () => {
    const scrollY = window.scrollY;

    const bg = document.querySelector(".auth-wrapper");
    if (bg) {
      bg.style.setProperty("--scroll", scrollY);
    }
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);
useEffect(() => {
  let i = 0;
  const interval = setInterval(() => {
    setMensaje(textoCompleto.slice(0, i));
    i++;
    if (i > textoCompleto.length) clearInterval(interval);
  }, 50);

  return () => clearInterval(interval);
}, []);
 
  return (
  <div className="auth-wrapper">

    {/* PERSONAJE */}
    <div className="character-container">
    <div className="float">
      <img src="Manuka.png" alt="personaje" />
    </div>
  


  <div className="speech-image">
    <p>{mensaje}</p>
  </div>

    </div>
       <div className="auth-header">
      <Logo className="logo" />
<div className="bienvenido-auth">
  <h1>¡Bienvenido!</h1>
</div>
      
      <p>Ingresá para subir tu foto</p>
       </div>
    {/* CARD LOGIN */}
    <div className="auth-container">
   

      <form onSubmit={handleLogin} className="auth-form">
      
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