import React from "react";
import "./App.css";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ForgotPasswordPage from "./components/ForgotPasswordPage";
import ChatPage from "./components/ChatPage";
import ResetPasswordPage from "./components/ResetPasswordPage";
import AdminPage from "./components/AdminPage";
import ModeratorPage from "./components/ModeratorPage";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/moderator" element={<ModeratorPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
