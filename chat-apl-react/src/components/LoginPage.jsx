import React from 'react'

function LoginPage() {
    return (
        <div className="login-container">
          <div className="login-card">
            <h2 className="login-title">LogIn</h2>
            <div className="form-group">
              <label>Email</label>
              <input type="email" placeholder="Unesite email" />
            </div>
            <div className="form-group">
              <label>Lozinka</label>
              <input type="password" placeholder="Unesite lozinku" />
            </div>
            <div className="links">
              <button className="link-btn">Zaboravljena lozinka?</button>
              <button className="link-btn">Registruj se</button>
            </div>
            <button className="login-btn">Prijavi se</button>
          </div>
        </div>
      );
}

export default LoginPage
