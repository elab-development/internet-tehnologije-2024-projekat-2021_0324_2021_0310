import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Popunite sva polja.");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
      if (response.ok) {
        setSuccessMessage("Uspešno ste ulogovani!");
        setError("");
  
        localStorage.setItem("token", data.token);
        localStorage.setItem("email", data.user.email);
        localStorage.setItem("userId", data.user.id);
        localStorage.setItem("role", data.user.role);

        setTimeout(() => {
          if (data.user.role === "admin") {
            navigate("/admin");
          } else if (data.user.role === "moderator") {
            navigate("/moderator");
          } else {
            navigate("/chat");
          }
        }, 1000);
      } else {
        setError(data.message || "Došlo je do greške.");
      }
    } catch (error) {
      setError("Greška prilikom povezivanja sa serverom.");
    }
  };
  
  
  

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Prijava</h2>

        {successMessage && (
          <p style={{ color: "green", textAlign: "center" }}>{successMessage}</p>
        )}
        {error && (
          <p style={{ color: "red", textAlign: "center" }}>{error}</p>
        )}

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Unesite email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Lozinka</label>
          <input
            type="password"
            placeholder="Unesite lozinku"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="links">
          <Link to="/forgot-password" className="link-btn">
            Zaboravljena lozinka?
          </Link>
          <Link to="/register" className="link-btn">
            Registruj se
          </Link>
        </div>

        <button className="login-btn" onClick={handleLogin}>
          Prijavi se
        </button>
      </div>
    </div>
  );
}
