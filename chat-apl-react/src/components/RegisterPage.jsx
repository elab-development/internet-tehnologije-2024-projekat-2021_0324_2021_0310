import React from 'react';
import { Link } from "react-router-dom";

function RegisterPage() {
    return (
        <div className="login-container">
          <div className="login-card">
            <h2 className="login-title">Registracija</h2>
            <div className="form-group">
              <label>Ime</label>
              <input type="text" placeholder="Unesite ime" />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" placeholder="Unesite email" />
            </div>
            <div className="form-group">
              <label>Lozinka</label>
              <input type="password" placeholder="Unesite lozinku" />
            </div>
            <div className="form-group">
              <label>Uloga</label>
              <select>
                <option value="user">Korisnik</option>
                <option value="moderator">Moderator</option>
                <option value="admin">Administrator</option>
              </select>
            </div>
            <button className="login-btn">Registruj se</button>
            <Link to="/" className="back-link">Nazad na login</Link>
          </div>
        </div>
      );
}

export default RegisterPage
