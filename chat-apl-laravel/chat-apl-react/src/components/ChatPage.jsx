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


echo.connector.pusher.connection.bind("connected", () => {
  console.log("✅ Povezan sa Pusher-om");
});

export default function ChatPage() {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [search, setSearch] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [attachments, setAttachments] = useState([]);

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

    fetch(`http://localhost:8000/api/conversations/${selectedChat.id}/messages`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setMessages(data));

    const channelName = `chat.${selectedChat.id}`;
    const channel = echo.private(channelName);

    console.log("📡 Pretplata na kanal:", channelName);

    channel.listen("MessageSent", (e) => {
      console.log("📥 Stigla nova poruka preko Pusher-a:", e);
      setMessages((prev) => [...prev, e.message]);
    });

    return () => {
      echo.leave(channelName);
    };
  }, [selectedChat]);

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

      if (response.ok) {
        setNewMessage("");
      } else {
        const result = await response.json();
        console.error("❌ Backend greška:", result);
      }
    } catch (error) {
      console.error("❌ Greška u slanju poruke:", error);
    }
  };

  const filteredChats = chats.filter((chat) =>
    chat.title.toLowerCase().includes(search.toLowerCase())
  );

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
                  className={`chat-message ${parseInt(msg.user_id) === currentUserId ? "me" : "them"}`}
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
    </div>
  );
}
