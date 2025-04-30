import { useState } from "react";
import "./App.css";
import MainScreen from "./components/MainScreen";
import { ApiClient } from "./services/api";

const apiClient = new ApiClient();

function App() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  const handleSend = async () => {
    const result = await apiClient.sendData(input);
    setResponse(result);
  };

  return (
    <div className="app-container">
      <div className="input-group">
        <label htmlFor="userInput">Input:</label>
        <input
          id="userInput"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
      <button onClick={handleSend}>Send</button>
      <MainScreen content={response} />
    </div>
  );
}

export default App;
