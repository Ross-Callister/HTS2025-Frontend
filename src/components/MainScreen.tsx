import React, { useState } from "react";
import "./Chat.css";
import { parseWidgets } from "../utils/widgetParser";
import { ApiClient } from "../services/api";

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
}

interface MainScreenProps {}

const apiClient = new ApiClient();

const MainScreen: React.FC<MainScreenProps> = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || isLoading) return;

    setIsLoading(true);
    const userMessage = newMessage.trim();

    // Add user message immediately
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        role: "user",
        content: userMessage,
      },
    ]);
    setNewMessage("");

    try {
      // Get response from API
      const response = await apiClient.widgets(userMessage);

      // Add assistant message with response
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          role: "assistant",
          content: response.response,
        },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
      // Add error message
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          role: "assistant",
          content: "Sorry, there was an error processing your message.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
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
          onKeyUp={(e) => e.key === "Enter" && handleSendMessage()}
          placeholder="Type a message..."
          className="message-input"
          disabled={isLoading}
        />
        <button
          onClick={handleSendMessage}
          className="send-button"
          disabled={isLoading}
        >
          {isLoading ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default MainScreen;
