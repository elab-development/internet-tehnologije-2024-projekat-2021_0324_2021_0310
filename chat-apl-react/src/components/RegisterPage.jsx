import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function RegisterPage() {
  const [ime, setIme] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [uloga, setUloga] = useState("user");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!ime || !email || !password) {
      setError("Sva polja su obavezna.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: ime,
          email,
          password,
          role: uloga,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage("Uspešno ste se registrovali!");
        setError("");

        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        setError(data.message || "Registracija nije uspela.");
      }
    } catch (err) {
      setError("Greška pri komunikaciji sa serverom.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Registracija</h2>

        {successMessage && (
          <p style={{ color: "green", textAlign: "center" }}>{successMessage}</p>
        )}
        {error && (
          <p style={{ color: "red", textAlign: "center" }}>{error}</p>
        )}

        <div className="form-group">
          <label>Ime</label>
          <input
            type="text"
            placeholder="Unesite ime"
            value={ime}
            onChange={(e) => setIme(e.target.value)}
          />
        </div>

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

        <div className="form-group">
          <label>Uloga</label>
          <select value={uloga} onChange={(e) => setUloga(e.target.value)}>
            <option value="user">Korisnik</option>
            <option value="moderator">Moderator</option>
            <option value="admin">Administrator</option>
          </select>
        </div>

        <button className="login-btn" onClick={handleRegister}>
          Registruj se
        </button>

        <Link to="/" className="back-link">
          Nazad na login
        </Link>
      </div>
    </div>
  );
}
