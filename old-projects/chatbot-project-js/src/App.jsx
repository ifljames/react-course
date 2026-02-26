import { useEffect, useState } from "react";
import { ChatInput } from "./components/ChatInput";
import ChatMessages from "./components/ChatMessages";
import { Chatbot } from "supersimpledev";
import RobotIcon from "./assets/robot.png";
import "./App.css";

function App() {
  const [chatMessages, setChatMessages] = useState(
    JSON.parse(localStorage.getItem("messages")) || []
  );

  useEffect(() => {
    Chatbot.addResponses({
      ayayay: "You're my little butterfly.",
      test: "Test deez nuts boy!",
      simsimi: "Who?!"
    });
  }, []);

  useEffect(() => {
    localStorage.setItem("messages", JSON.stringify(chatMessages));
  }, [chatMessages]);

  let num = chatMessages.length;
  let title = `${num} ${num === 1 ? "Message" : "Messages"}`;

  return (
    <>
      <link rel="icon" type="image/svg+xml" href={RobotIcon} />
      <title>{title}</title>

      <div className="app-container">
        <ChatMessages chatMessages={chatMessages} />
        <ChatInput
          chatMessages={chatMessages}
          setChatMessages={setChatMessages}
        />
      </div>
    </>
  );
}

export default App;
