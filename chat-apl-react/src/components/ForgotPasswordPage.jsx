import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { Link } from "react-router-dom";


export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [captchaToken, setCaptchaToken] = useState(null);
    const [message, setMessage] = useState("");
  
    const handleSubmit = async () => {
      if (!email || !captchaToken) {
        setMessage("Popunite email i potvrdite da niste robot.");
        return;
      }
  
      try {
        const response = await fetch("http://localhost:3001/forgot-password", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, captcha: captchaToken }),
        });
  
        const data = await response.json();
  
        if (data.success) {
          setMessage("Link za resetovanje lozinke je poslat na email.");
        } else {
          setMessage(data.message ("Greška prilikom slanja zahteva."));
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
              sitekey="YOUR_SITE_KEY"
              onChange={(token) => setCaptchaToken(token)}
            />
          </div>
  
          {message && (
            <p style={{ textAlign: "center", color: message.includes("greška") ? "red" : "green" }}>{message}</p>
          )}
  
          <button className="login-btn" onClick={handleSubmit}>Pošalji</button>
          <Link to="/" className="back-link">Nazad na login</Link>
        </div>
      </div>
    );
  }

