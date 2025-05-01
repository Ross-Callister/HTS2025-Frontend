import React, { useState } from "react";
import "./Chat.css";
import { parseWidgets } from "../utils/widgetParser";

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
}

interface MainScreenProps {}

type Role = "user" | "assistant";

const MainScreen: React.FC<MainScreenProps> = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = (role: Role) => {
    if (!newMessage.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        role: role,
        content: newMessage.trim(),
      },
    ]);
    setNewMessage("");
  };

  const renderMessage = (message: Message) => {
    const content =
      message.role === "assistant"
        ? parseWidgets(message.content)
        : message.content;

    return (
      <div key={message.id} className={`message ${message.role}`}>
        {content}
      </div>
    );
  };

  return (
    <div className="chat-container">
      {messages.map(renderMessage)}

      <div className="message-input-container">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyUp={(e) => e.key === "Enter" && handleSendMessage("user")}
          placeholder="Type a message..."
          className="message-input"
        />
        <button
          onClick={() => handleSendMessage("user")}
          className="send-button"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default MainScreen;
