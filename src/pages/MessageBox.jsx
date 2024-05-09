// MessageBox.js
import React, { useState } from "react";
import styles from "./MessageBox.module.css";

const MessageBox = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! How are you?" },
    { id: 2, text: "I'm fine, thank you. How about you?" },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const handleMessageChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      const newMessageObj = {
        id: messages.length + 1,
        text: newMessage,
      };
      setMessages([...messages, newMessageObj]);
      setNewMessage("");
    }
  };

  return (
    <div className={styles.messageBoxContainer}>
      <div className={styles.messageBox}>
        <div className={styles.messageContainer}>
          {messages.map((message) => (
            <div key={message.id} className={styles.message}>
              {message.text}
            </div>
          ))}
        </div>
        <div className={styles.inputContainer}>
          <input
            type="text"
            value={newMessage}
            onChange={handleMessageChange}
            placeholder="Type your message..."
            className={styles.input}
          />
          <button onClick={handleSendMessage} className={styles.sendButton}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageBox;
