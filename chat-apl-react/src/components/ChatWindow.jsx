// ChatWindow.jsx
import React from "react";
import { Paperclip, Download } from "lucide-react";

export default function ChatWindow({
  selectedChat,
  currentUserId,
  messages,
  isSuspended,
  handleSend,
  newMessage,
  setNewMessage,
  attachments,
  setAttachments,
  handleDownload,
  handleMessageClick,
  selectedMessageId,
  handleDeleteMessage,
  handleReportMessage
}) {
  return (
    <div className="chat-main">
      <div className="chat-messages">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`chat-message ${parseInt(msg.user_id) === currentUserId ? "me" : "them"} ${selectedMessageId === msg.id ? "selected" : ""}`}
            onClick={() => handleMessageClick(msg.id)}
          >
            <span>{msg.content}</span>
            {msg.attachments && msg.attachments.length > 0 && (
              <div className="chat-attachments">
                {msg.attachments.map((att) => {
                  const fileName = att.original_name || att.file_path.split("/").pop();
                  const fileUrl = `http://localhost:8000/storage/${att.file_path}`;
                  const isImage = att.file_type?.startsWith("image/");

                  return (
                    <div key={att.id} className="attachment-bubble">
                      {isImage ? (
                        <img src={fileUrl} alt={fileName} className="chat-image" />
                      ) : (
                        <div className="attachment-file flex items-center gap-2 bg-gray-800 p-2 rounded-lg text-white mt-1">
                          <span className="attachment-icon">📎</span>
                          <span className="attachment-name">{fileName}</span>
                          <button
                            onClick={() => handleDownload(att.file_path, fileName)}
                            className="ml-auto text-blue-400 hover:underline bg-transparent border-none cursor-pointer flex items-center"
                          >
                            <Download size={16} />
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
            {parseInt(msg.user_id) === currentUserId && selectedMessageId === msg.id && (
              <button className="delete-message-btn" onClick={() => handleDeleteMessage(msg.id)}>❌</button>
            )}
            {parseInt(msg.user_id) !== currentUserId && selectedMessageId === msg.id && (
              <button className="report-btn" onClick={() => handleReportMessage(msg.id)}>🚨 Prijavi</button>
            )}
          </div>
        ))}
      </div>
      {isSuspended ? (
        <div className="chat-suspended-msg">
          <p style={{
            backgroundColor: "#fee2e2",
            padding: "20px",
            textAlign: "center",
            color: "#b91c1c",
            fontWeight: "bold",
            fontSize: "1.3rem",
            borderRadius: "12px",
            margin: "10px 0"
          }}>
            Vaš nalog je trenutno suspendovan. Ne možete slati poruke.
          </p>
        </div>
      ) : (
        <>
          {attachments.length > 0 && (
            <div className="attachment-preview">
              <p>Prilozi:</p>
              <ul>
                {attachments.map((file, idx) => (
                  <li key={idx}>{file.name}</li>
                ))}
              </ul>
            </div>
          )}
          <div className="chat-input">
            <label htmlFor="file-input" className="attachment-icon">
              <Paperclip size={20} />
            </label>
            <input
              id="file-input"
              type="file"
              multiple
              onChange={(e) => setAttachments(Array.from(e.target.files))}
              style={{ display: "none" }}
            />
            <input
              type="text"
              placeholder="Ukucaj poruku..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button onClick={handleSend}>Pošalji</button>
          </div>
        </>
      )}
    </div>
  );
}
