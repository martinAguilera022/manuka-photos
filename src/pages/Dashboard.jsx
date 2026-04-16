import { useState } from "react";
import confetti from "canvas-confetti";
import "./Dashboard.css";
import { useRef } from "react";
import { useEffect } from "react";
const Dashboard = () => {
  const [file, setFile] = useState(null);
  const [success, setSuccess] = useState(false);
const audioRef = useRef(null);
  const handleChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;
    setFile(selected);
  };

useEffect(() => {
  audioRef.current = new Audio("/success.mp3");
  audioRef.current.volume = 0.4;
}, []);

 const fireConfetti = () => {
  const duration = 2000;
  const end = Date.now() + duration;

  const colors = ["#1a99aa", "#f7aa20", "#ec5a41", "#c5b35d"];

  const frame = () => {
    confetti({
      particleCount: 6,
      angle: 60,
      spread: 70,
      origin: { x: 0 },
      colors,
    });

    confetti({
      particleCount: 6,
      angle: 120,
      spread: 70,
      origin: { x: 1 },
      colors,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  };

  frame();
};

const playSound = () => {
  if (!audioRef.current) return;

  audioRef.current.currentTime = 0;
  audioRef.current.play();
};
  const handleSubmit = () => {
    if (!file) return;

    setTimeout(() => {
        if (!file) return;

  playSound(); // 👈 primero


      setSuccess(true);
      
      
      setTimeout(() => {
  fireConfetti();
}, 100);
      
    }, 400);
  };

  const handleReset = () => {
    setFile(null);
    setSuccess(false);
  };

  if (success) {
    return (
      <div className="success-screen">
        <div className="success-card">

          <img src="/Manuka.png" className="success-character" />

          <h1 className="success-title">¡Te ves Genial! 🎉</h1>
          <p>Tu foto fue enviada con exito</p>

          <button className="success-btn" onClick={handleReset}>
           Volver
          </button>
        </div>
      </div>
    );
  }

  return (
   <div className="dashboard">

  <div className="card">

    <h1>Subí tu foto</h1>
    <p className="subtitle">Elegí tu mejor sonrisa</p>

    {/* UPLOAD */}
    <label className="upload-box">
      <span className="upload-icon">📷</span>
      <span className="upload-text">
        {file ? "Cambiar foto" : "Tocar para elegir"}
      </span>

      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
        hidden
      />
    </label>

    {/* PREVIEW */}
    {file && (
      <div className="preview">
        <img src={URL.createObjectURL(file)} />

        <div className="preview-overlay">
          Lista para enviar
        </div>
      </div>
    )}

    {/* BOTÓN */}
    <button
      className={`submit-btn ${file ? "active" : ""}`}
      disabled={!file}
      onClick={handleSubmit}
    >
      Continuar
    </button>

  </div>

</div>
  );
};

export default Dashboard;