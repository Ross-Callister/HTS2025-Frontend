import { useState } from "react";
import "./App.css";
import MainScreen from "./components/MainScreen";
import { ApiClient } from "./services/api";

const apiClient = new ApiClient();

function App() {
  return (
    <div className="app-container">
      <MainScreen />
    </div>
  );
}

export default App;
