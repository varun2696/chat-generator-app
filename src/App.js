import React, { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [inputText, setInputText] = useState("");
  const [responseText, setResponseText] = useState("");
  const [loading, setLoading] = useState(false)

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const generateResponse = async () => {
    setLoading(true)
    setInputText("")
    try {
      const response = await axios.post(
        "https://rich-gold-codfish-shoe.cyclic.app/generateChat",
        {
          keyword: `Tell me the quote on ${inputText}`,
        });
      // console.log(response)
      setResponseText(response.data.generatedChat);
      setLoading(false)
    }
    catch (error) {
      console.error("Error fetching response:", error);
      setResponseText("Error fetching response. Please try again later.");
    }
  };

  return (
    <div className="App">
      <h1>Quotes Generator</h1>
      <div className="input-container">
        <input
          type="text"
          value={inputText}
          onChange={handleInputChange}
          placeholder="Enter your input..."
        />
        <button
          disabled={!inputText}
          onClick={generateResponse}
        >
          Generate Response</button>
      </div>
      {loading ? (
        <div className="loading-container">
          <p className="loader">wait</p>
        </div>
      ) : (
        responseText && <div className="response-card">{responseText}</div>
      )}
    </div>
  );
}

export default App;
