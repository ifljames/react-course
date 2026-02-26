import { useState } from "react";
import { Chatbot } from "supersimpledev";
import dayjs from "dayjs";
import LoadingSpinner from "../assets/loading-spinner.gif";
import "./ChatInput.css";

type ChatMessages = {
  id: string;
  message: string | React.ReactNode;
  sender: string;
}[];

type ChatInputProps = {
  chatMessages: ChatMessages;
  setChatMessages: (chatMessages: ChatMessages) => void;
};

export function ChatInput({ chatMessages, setChatMessages }: ChatInputProps) {
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function saveInputText(event: { target: { value: string } }) {
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
        message: <img className="loading-spinner" src={LoadingSpinner} />,
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

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
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
        size={30}
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
