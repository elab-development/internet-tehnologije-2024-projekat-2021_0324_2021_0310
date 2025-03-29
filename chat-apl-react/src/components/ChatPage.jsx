import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ChatPage.css";
import Echo from "laravel-echo";
import Pusher from "pusher-js";

window.Pusher = Pusher;

const echo = new Echo({
  broadcaster: "pusher",
  key: "44d0e910d2a6d3e2396b",
  cluster: "eu",
  forceTLS: true,
  authEndpoint: "http://localhost:8000/broadcasting/auth", // ← VAŽNO!
  auth: {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  },
});

export default function ChatPage() {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [search, setSearch] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [selectedMessageId, setSelectedMessageId] = useState(null); // Držimo ID poruke koja je kliknuta
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const [reasons, setReasons] = useState([]);
  const [reportMessageId, setReportMessageId] = useState(null); // ID poruke koja je prijavljena

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const currentUserId = parseInt(localStorage.getItem("userId"));

  useEffect(() => {
    if (!token) navigate("/");
  }, [navigate, token]);

  useEffect(() => {
    if (!token) return;
    fetch("http://localhost:8000/api/chats", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setChats(data);
        setSelectedChat(data[0] || null);
      });
  }, [token]);

  useEffect(() => {
    if (!selectedChat || !token) return;

    // Prvo učitavanje poruka
    fetch(`http://localhost:8000/api/conversations/${selectedChat.id}/messages`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setMessages(data));

    // Slusanje novih poruka putem Pusher-a
    const channelName = `chat.${selectedChat.id}`;
    const channel = echo.private(channelName);

    console.log("📡 Pretplata na kanal:", channelName);

    channel.listen("MessageSent", (e) => {
      console.log("📥 Stigla nova poruka preko Pusher-a:", e);
      // Dodajte novu poruku u postojeću listu poruka
      setMessages((prevMessages) => [...prevMessages, e.message]);
    });

    // Čišćenje kada se selektuje novi chat
    return () => {
      echo.leave(channelName);
    };
  }, [selectedChat, token]);

  // Funkcija za brisanje poruke
  const handleDeleteMessage = (messageId) => {
    fetch(`http://localhost:8000/api/messages/${messageId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then(() => {
        // Filter poruka i uklanjanje obrisane poruke iz state-a
        setMessages((prevMessages) =>
          prevMessages.filter((msg) => msg.id !== messageId)
        );
      })
      .catch((err) => {
        console.error("Greška prilikom brisanja poruke:", err);
      });
  };

  const handleSend = async () => {
    if (!newMessage.trim()) return;

    try {
      const response = await fetch(`http://localhost:8000/api/conversations/${selectedChat.id}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        body: JSON.stringify({
          content: newMessage,
          user_id: currentUserId,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setNewMessage(""); // Očistite unos nakon slanja
        // Pošaljite novu poruku putem Pusher-a
        echo.private(`chat.${selectedChat.id}`).whisper("messageSent", result);
      } else {
        console.error("❌ Backend greška:", result);
      }
    } catch (error) {
      console.error("❌ Greška u slanju poruke:", error);
    }
  };

  const filteredChats = chats.filter((chat) =>
    chat.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleMessageClick = (messageId) => {
    // Postavljamo ID kliknute poruke
    setSelectedMessageId((prev) => (prev === messageId ? null : messageId));
  };

  const handleReportMessage = (messageId) => {
    if (messageId !== currentUserId) {
      setReportMessageId(messageId);
      setIsReportModalOpen(true);
    }
  };

  const handleReportSubmit = () => {
    fetch(`http://localhost:8000/api/messages/report/${reportMessageId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ reason: reportReason }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          alert("Poruka je prijavljena!");
          setIsReportModalOpen(false);
          setReportReason("");
        }
      })
      .catch((err) => {
        console.error("Greška u prijavi poruke:", err);
      });
  };

  return (
    <div className="chat-container">
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
                  className={`chat-message ${parseInt(msg.user_id) === currentUserId ? "me" : "them"} ${
                    selectedMessageId === msg.id ? "selected" : ""
                  }`}
                  onClick={() => handleMessageClick(msg.id)}
                >
                  {selectedChat.is_group && msg.user && (
                    <div className="chat-sender">{msg.user.name || msg.user.email}</div>
                  )}

                  <span>{msg.content}</span>

                  {msg.attachments && msg.attachments.map((att) => (
                    <div key={att.id} className="chat-attachment">
                      {att.file_type.startsWith("image/") ? (
                        <img
                          src={`http://localhost:8000/storage/${att.file_path}`}
                          alt="slika"
                          className="chat-image"
                        />
                      ) : (
                        <a
                          href={`http://localhost:8000/storage/${att.file_path}`}
                          target="_blank"
                          rel="noreferrer"
                          className="chat-file"
                        >
                          📎 {att.file_path.split("/").pop()}
                        </a>
                      )}
                    </div>
                  ))}

                  <div className="chat-time">
                    {new Date(msg.created_at).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>

                  {/* Dugme za brisanje */}
                  {parseInt(msg.user_id) === currentUserId && selectedMessageId === msg.id && (
                    <button
                      className="delete-message-btn"
                      onClick={() => handleDeleteMessage(msg.id)}
                    >
                      ❌
                    </button>
                  )}

                  {/* Dugme za prijavu poruke */}
                  {parseInt(msg.user_id) !== currentUserId && selectedMessageId === msg.id && (
                    <button
                      className="report-btn"
                      onClick={() => handleReportMessage(msg.id)}
                    >
                      🚨 Prijavi
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div className="chat-input">
              <input
                type="text"
                placeholder="Ukucaj poruku..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />

              <input
                type="file"
                multiple
                onChange={(e) => setAttachments(Array.from(e.target.files))}
                style={{ color: "white" }}
              />

              <button onClick={handleSend}>Pošalji</button>
            </div>
          </>
        ) : (
          <div className="chat-placeholder">Izaberi razgovor da vidiš poruke</div>
        )}
      </div>

      {/* Modal za prijavu */}
      {isReportModalOpen && (
        <div className="report-modal active">
          <div className="report-modal-content">
            <select
              value={reportReason}
              onChange={(e) => setReportReason(e.target.value)}
            >
              <option value="">Izaberi razlog</option>
              <option value="Spam">Spam</option>
              <option value="Neprikladno ponašanje">Neprikladno ponašanje</option>
              <option value="Ugrožavanje sigurnosti">Ugrožavanje sigurnosti</option>
              {/* Dodajte više razloga prema vašim potrebama */}
            </select>
            <button onClick={handleReportSubmit}>Prijavi</button>
            <button className="close-btn" onClick={() => setIsReportModalOpen(false)}>
              Zatvori
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

