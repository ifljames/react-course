import { useState } from "react";
import { Chatbot } from "supersimpledev";
import dayjs from "dayjs";
import "./ChatInput.css";

export function ChatInput({ chatMessages, setChatMessages }) {
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function saveInputText(event) {
    setInputText(event.target.value);
  }

  async function sendMessage() {
    if (isLoading || inputText === "") {
      return;
    }

    const time = dayjs().valueOf();

    setIsLoading(true);

    setInputText("");

    const newChatMessages = [
      ...chatMessages,
      {
        message: inputText,
        sender: "user",
        time: dayjs(time).format("h:mma"),
        id: crypto.randomUUID(),
      },
    ];

    setChatMessages([
      ...newChatMessages,
      {
        message: (
          <img
            className="loading-spinner"
            src="https://supersimple.dev/images/loading-spinner.gif"
          />
        ),
        sender: "robot",
        id: crypto.randomUUID(),
      },
    ]);

    const response = await Chatbot.getResponseAsync(inputText);
    setChatMessages([
      ...newChatMessages,
      {
        message: response,
        sender: "robot",
        time: dayjs(time).format("h:mma"),
        id: crypto.randomUUID(),
      },
    ]);

    setIsLoading(false);
  }

  function handleKeyDown(event) {
    if (event.key == "Enter") {
      sendMessage();
    } else if (event.key == "Escape") {
      setInputText("");
    }
  }

  function clearMessages() {
    setChatMessages([]);
    localStorage.removeItem("messages");
  }

  return (
    <div className="chat-input-container">
      <input
        className="chat-input"
        placeholder="Send a message to Chatbot"
        onChange={saveInputText}
        onKeyDown={handleKeyDown}
        value={inputText}
      />
      <button className="send-button" onClick={sendMessage}>
        Send
      </button>
      <button className="clear-button" onClick={clearMessages}>
        Clear
      </button>
    </div>
  );
}
