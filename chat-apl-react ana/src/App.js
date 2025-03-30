import React from "react";
import "./App.css";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ForgotPasswordPage from "./components/ForgotPasswordPage";
import ChatPage from "./components/ChatPage";
import ResetPasswordPage from "./components/ResetPasswordPage";
import ModeratorPage from "./components/ModeratorPage";
import AdminPage from "./components/AdminPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/admin" element={<AdminPage />} />
       <Route path="/moderator" element={<ModeratorPage />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
