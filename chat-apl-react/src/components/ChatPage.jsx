import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Echo from "laravel-echo";
import Pusher from "pusher-js";
import { Paperclip, Download } from "lucide-react";
import "./ChatPage.css";
import ChatWindow from "./ChatWindow";


window.Pusher = Pusher;



export default function ChatPage() {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [search, setSearch] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [selectedMessageId, setSelectedMessageId] = useState(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const [reasons, setReasons] = useState([]);
  const [reportMessageId, setReportMessageId] = useState(null);
  const [availableUsers, setAvailableUsers] = useState([]);
  const [showChatModal, setShowChatModal] = useState(false);
  const [chatType, setChatType] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [groupTitle, setGroupTitle] = useState("");
  const [isSuspended, setIsSuspended] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const currentUserId = parseInt(localStorage.getItem("userId"));

  useEffect(() => {
    if (!token) navigate("/");
  }, [navigate, token]);

  const echo = new Echo({
    broadcaster: "pusher",
    key: "44d0e910d2a6d3e2396b",
    cluster: "eu",
    forceTLS: true,
    authEndpoint: "http://localhost:8000/broadcasting/auth",
    auth: {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    },
  });

  const handleDownload = (filePath, fileName) => {
    const confirmed = window.confirm(`Da li želite da preuzmete fajl: ${fileName}?`);
    if (confirmed) {
      const fileOnly = filePath.split("/").pop();
      const downloadUrl = `http://localhost:8000/download/${fileOnly}`;
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };
  
  useEffect(() => {
    if (!token) return;

    // Dohvati chatove
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

    // Proveri da li je suspendovan
    fetch("http://localhost:8000/api/user-info", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const now = new Date();
        const suspendedUntil = data.suspended_until ? new Date(data.suspended_until) : null;
        setIsSuspended(suspendedUntil && suspendedUntil > now);
      });
  }, [token]);
 //ucitavanje poruka
    const fetchMessages = () => {
      if (!selectedChat || !token) return;

      fetch(`http://localhost:8000/api/conversations/${selectedChat.id}/messages`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => setMessages(data));
    };
    //osvezavanje
  useEffect(() => {
    if (!selectedChat || !token) return;

    const id = setInterval(fetchMessages, 1000);
    setIntervalId(id);

   
    return () => clearInterval(id);
  }, [selectedChat, token]);

    //ucitavanje poruka odmah kada se odabere chat
    useEffect(() => {
      fetchMessages(); 
    }, [selectedChat]);

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

    channel.listen("MessageSent", (e) => {
      setMessages((prevMessages) => [...prevMessages, e.message]);
    });

    return () => {
      echo.leave(channelName);
    };
  }, [selectedChat, token]);

  useEffect(() => {
    if (!token) return;

    // Dohvati chatove
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

    // Proveri da li je suspendovan
    fetch("http://localhost:8000/api/user-info", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const now = new Date();
        const suspendedUntil = data.suspended_until ? new Date(data.suspended_until) : null;
        setIsSuspended(suspendedUntil && suspendedUntil > now);
      });
  }, [token]);

  useEffect(() => {
    if (!showChatModal) return;
    fetch("http://localhost:8000/api/available-users", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setAvailableUsers(data));
  }, [showChatModal]);

  useEffect(() => {
    fetch("http://localhost:8000/api/report-reasons", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setReasons(data.reasons))
      .catch((err) => console.error("Greška pri učitavanju razloga:", err));
  }, []);


  const handleSend = async () => {
    if (isSuspended) {
      alert("Vaš nalog je trenutno suspendovan. Ne možete slati poruke.");
      return;
    }
  
    if (!newMessage.trim() && attachments.length === 0) return;
  
    const formData = new FormData();
    formData.append("user_id", currentUserId);
    formData.append("content", newMessage);
  
    attachments.forEach((file) => {
      formData.append("attachments[]", file);
    });
  
    const res = await fetch(`http://localhost:8000/api/conversations/${selectedChat.id}/messages`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      body: formData,
    });
  
    if (res.ok) {
      setNewMessage("");
      setAttachments([]);
      fetchMessages();
    } else {
      const errorData = await res.json();
      console.error("Greška:", errorData);
    }
  };
  

  const handleLogout = async () => {
    if (!window.confirm("Da li ste sigurni da želite da se odjavite?")) return;

    try {
      await fetch("http://localhost:8000/api/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      navigate("/");
    } catch (err) {
      console.error("Greška prilikom odjave:", err);
    }
  };

  const handleDeleteMessage = (messageId) => {
    const potvrda = window.confirm("Da li ste sigurni da želite da obrišete ovu poruku?");
    if (!potvrda) return;

    fetch(`http://localhost:8000/api/messages/${messageId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then(() => {
        setMessages((prevMessages) => prevMessages.filter((msg) => msg.id !== messageId));
      })
      .catch((err) => {
        console.error("Greška prilikom brisanja poruke:", err);
      });
  };

  const handleMessageClick = (messageId) => {
    setSelectedMessageId((prev) => (prev === messageId ? null : messageId));
  };

  const handleReportMessage = (messageId) => {
    if (messageId !== currentUserId) {
      setReportMessageId(messageId);
      setIsReportModalOpen(true);
    }
  };

  const handleReportSubmit = () => {
    if (!reportReason) return alert("Izaberi razlog za prijavu!");
    fetch(`http://localhost:8000/api/messages/${reportMessageId}/report`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ reason: reportReason }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.message) {
          alert(result.message);
          setIsReportModalOpen(false);
          setReportReason("");
        }
      })
      .catch((err) => {
        console.error("Greška u prijavi poruke:", err);
      });
  };

  const handleStartChat = async (userId) => {
    try {
      const res = await fetch("http://localhost:8000/api/start-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ user_id: userId }),
      });

      const newChat = await res.json();

      if (!newChat.title) newChat.title = newChat.name || "Privatni chat";

      setChats((prev) => [newChat, ...prev.filter((c) => c.id !== newChat.id)]);
      setSelectedChat(newChat);
      setShowChatModal(false);
      setChatType(null);
    } catch (err) {
      console.error("Greška pri pokretanju chata:", err);
    }
  };

  const handleStartGroupChat = async () => {
    if (selectedUsers.length < 2) return alert("Izaberi bar 2 korisnika!");
    if (!groupTitle.trim()) return alert("Unesi naziv grupe!");

    const res = await fetch("http://localhost:8000/api/conversations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: groupTitle,
        users: [...selectedUsers, currentUserId],
      }),
    });

    const newChat = await res.json();
    if (!newChat.title) newChat.title = groupTitle;

    setChats((prev) => [newChat, ...prev.filter((c) => c.id !== newChat.id)]);
    setSelectedChat(newChat);
    setShowChatModal(false);
    setChatType(null);
    setSelectedUsers([]);
    setGroupTitle("");
  };

  const toggleUserSelection = (userId) => {
    setSelectedUsers((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
    );
  };

  const filteredChats = chats.filter((chat) =>
    (chat.title || "").toLowerCase().includes(search.toLowerCase())
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
            </div>
          ))}
        </div>
        <button className="new-chat-btn" onClick={() => setShowChatModal(true)}>
          + Novi chat
        </button>
      </div>

      <div className="chat-main">
        {selectedChat ? (
          <>
            <div className="chat-header">
              <div className="chat-header-content">
                <h3>{selectedChat.title}</h3>
                <button onClick={handleLogout} className="logout-btn">
                  <span className="logout-icon">→</span> Logout
                </button>
              </div>
            </div>
            <ChatWindow
      selectedChat={selectedChat}
      currentUserId={currentUserId}
      messages={messages}
      isSuspended={isSuspended}
      handleSend={handleSend}
      newMessage={newMessage}
      setNewMessage={setNewMessage}
      attachments={attachments}
      setAttachments={setAttachments}
      handleDownload={handleDownload}
      handleMessageClick={handleMessageClick}
      selectedMessageId={selectedMessageId}
      handleDeleteMessage={handleDeleteMessage}
      handleReportMessage={handleReportMessage}
    />
  </>
) : (
  <div className="chat-placeholder">Izaberi razgovor da vidiš poruke</div>
)}
</div>

      {showChatModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            {!chatType && (
              <>
                <h3>Odaberi tip chata</h3>
                <button onClick={() => setChatType("private")}>Privatni chat</button>
                <button onClick={() => setChatType("group")}>Grupni chat</button>
              </>
            )}
            {chatType === "private" && (
              <>
                <h3>Izaberi korisnika</h3>
                <ul className="user-select-list">
                  {availableUsers.map((user) => (
                    <li key={user.id} onClick={() => handleStartChat(user.id)}>
                      {user.name || user.email}
                    </li>
                  ))}
                </ul>
              </>
            )}
            {chatType === "group" && (
              <>
                <h3>Izaberi više korisnika</h3>
                <ul className="user-select-list">
                  {availableUsers.map((user) => (
                    <li
                      key={user.id}
                      onClick={() => toggleUserSelection(user.id)}
                      className={selectedUsers.includes(user.id) ? "selected" : ""}
                    >
                      {user.name || user.email}
                    </li>
                  ))}
                </ul>
                <input
                  type="text"
                  
                  placeholder="Naziv grupe"
                  value={groupTitle}
                  onChange={(e) => setGroupTitle(e.target.value)}
                  className="group-title-input"
                />
                <button onClick={handleStartGroupChat}>Pokreni grupni chat</button>
              </>
            )}
            <button className="close-btn" onClick={() => {
              setShowChatModal(false);
              setChatType(null);
              setSelectedUsers([]);
              setGroupTitle("");
            }}>
              Zatvori
            </button>
          </div>
        </div>
      )}

      {isReportModalOpen && (
        <div className="report-modal active">
          <div className="report-modal-content">
            <h3>Prijavi poruku</h3>
            <select
              value={reportReason}
              onChange={(e) => setReportReason(e.target.value)}
              required
            >
              <option value="">-- Izaberi razlog --</option>
              {Object.entries(reasons).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
            <button onClick={handleReportSubmit}>Pošalji prijavu</button>
            <button className="close-btn" onClick={() => setIsReportModalOpen(false)}>
              Zatvori
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
