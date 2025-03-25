import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { Link, useNavigate } from "react-router-dom";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [captchaToken, setCaptchaToken] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!email || !captchaToken) {
      setMessage("Popunite email i potvrdite da niste robot.");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:8000/api/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          email,
          "g-recaptcha-response": captchaToken, // ovo je ključno
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        localStorage.setItem("resetEmail", email);
        navigate("/reset-password");
      } else if (data.errors) {
        const allErrors = Object.values(data.errors).flat().join(" ");
        setMessage(allErrors);
      } else {
        setMessage(data.message || "Greška prilikom slanja zahteva.");
      }
    } catch (error) {
      setMessage("Došlo je do greške pri komunikaciji sa serverom.");
    }
  };
  

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Zaboravljena lozinka</h2>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Unesite svoj email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <ReCAPTCHA
            sitekey="6LecLecqAAAAAAJSNZSLfjSPnUGXnwnwgBDw4wAV"
            onChange={(token) => setCaptchaToken(token)}
          />
        </div>

        {message && (
          <p style={{ textAlign: "center", color: message.toLowerCase().includes("greška") ? "red" : "green" }}>
            {message}
          </p>
        )}

        <button className="login-btn" onClick={handleSubmit}>Nastavi</button>
        <Link to="/" className="back-link">Nazad na login</Link>
      </div>
    </div>
  );
}
