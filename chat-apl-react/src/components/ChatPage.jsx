import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ChatPage.css";

export default function ChatPage() {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const currentUserId = parseInt(localStorage.getItem("userId")); 
  console.log("ulogovani korisnik ID:", currentUserId);
  console.log(localStorage);

  // Ako korisnik nije prijavljen
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [navigate, token]);

  // Učitavanje svih chatova
  useEffect(() => {
    if (!token) return;

    fetch("http://localhost:8000/api/chats", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setChats(data);
        setSelectedChat(data[0] || null);
      })
      .catch((error) => {
        console.error("Greška pri dohvatanju chatova:", error);
      });
  }, [token]);

  // Učitavanje poruka za selektovani chat
  useEffect(() => {
    if (!selectedChat || !token) return;

    fetch(`http://localhost:8000/api/conversations/${selectedChat.id}/messages`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setMessages(data);
      })
      .catch((err) => {
        console.error("Greška pri učitavanju poruka:", err);
      });
  }, [selectedChat, token]);

  const filteredChats = chats.filter((chat) =>
    chat.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="chat-container">
      {/* Leva kolona */}
      <div className="chat-sidebar">
        <input
          type="text"
          placeholder="Pretraga"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="chat-search"
        />

        <div className="chat-list">
          {filteredChats.map((chat) => (
            <div
              key={chat.id}
              className={`chat-item ${selectedChat?.id === chat.id ? "active" : ""}`}
              onClick={() => setSelectedChat(chat)}
            >
              <div className="chat-name">{chat.title}</div>
              <div className="chat-last">
                <span>{chat.last_message}</span>
                <span className="chat-time">{chat.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Desna kolona */}
      <div className="chat-main">
        {selectedChat ? (
          <>
            <div className="chat-header">
              <h3>{selectedChat.title}</h3>
            </div>

            <div className="chat-messages">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`chat-message ${
                    msg.user_id === currentUserId ? "me" : "them"
                  }`}
                >
                  <span>{msg.content}</span>
                  <div className="chat-time">
                    {new Date(msg.created_at).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="chat-placeholder">Izaberi razgovor da vidiš poruke</div>
        )}
      </div>
    </div>
  );
}