import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const email = localStorage.getItem("resetEmail");

  useEffect(() => {
    if (!email) {
      navigate("/");
    }
  }, [email, navigate]);

  const handleReset = async () => {
    if (!password || !confirmPassword) {
      setMessage("Popunite sva polja.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Lozinke se ne poklapaju.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          password_confirmation: confirmPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.removeItem("resetEmail");

        // Prikaži alert popup
        alert(data.message || "Lozinka je uspešno promenjena.");

        // Kada korisnik klikne OK, preusmeri na login
        navigate("/");
      } else if (data.errors) {
        const allErrors = Object.values(data.errors).flat().join(" ");
        setMessage(allErrors);
      } else {
        setMessage(data.message || "Došlo je do greške.");
      }
    } catch (err) {
      setMessage("Greška pri komunikaciji sa serverom.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Resetuj lozinku</h2>

        {message && (
          <p
            style={{
              textAlign: "center",
              color: message.toLowerCase().includes("uspešno") ? "green" : "red",
              marginBottom: "10px",
            }}
          >
            {message}
          </p>
        )}

        <div className="form-group">
          <label>Nova lozinka</label>
          <input
            type="password"
            placeholder="Unesite novu lozinku"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Potvrdi lozinku</label>
          <input
            type="password"
            placeholder="Potvrdite lozinku"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <button className="login-btn" onClick={handleReset}>
          Potvrdi
        </button>
      </div>
    </div>
  );
}
