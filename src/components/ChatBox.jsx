import { useState, useRef, useEffect } from "react";
import Navbar from "./Navbar";
import ChatbotIcon from "./ChatbotIcon";
import ChatForm from "./ChatForm";
import ChatMessage from "./ChatMessage";

const ChatBox = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const chatEndRef = useRef(null);

  const generateBotResponse = async (history) => {
    const updateHistory=(text) =>{
      setChatHistory(
        prev=>[...prev.filter(msg=>msg.text !=="Thinking..."),{role:'model', text}]
      );
    }
    history = history.map(({role,text})=>({role, parts:[{text}]}));
    const requestOptions = {
      method: "POST",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify({contents: history})
    }
    try{
       const response = await fetch(import.meta.env.VITE_API_URL, requestOptions);
       const data= await response.json();
       if(!response.ok) throw new Error(data.error.message || "Something went wrong!");
        
       const apiResponseText = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, '$1').trim(); // Remove ** for bold text
       updateHistory(apiResponseText);
    } catch(error){
       console.log(error);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  

  return (
    <div className="h-screen w-screen bg-[hsl(250,62%,15%)] flex flex-col">

      <Navbar />

      <div className="flex-1 flex flex-col max-w-7xl w-full mx-auto overflow-hidden ">

        {/* Chat Body - Scrollable */}
        <div className="flex-1 overflow-y-auto px-4 py-6 flex flex-col gap-5  no-scrollbar">
          <div className="flex items-end gap-2 justify-start">
          <div className=" bg-purple-600 p-2 w-10 h-10 rounded-full">
                  <ChatbotIcon  />
                </div>
          <div className="max-w-[75%] px-3 py-1 rounded-2xl text-sm leading-6 bg-white/10 text-gray-200 border border-gray-700 rounded-bl-sm justify-start">Hello, how can I help you today?</div>
          </div>
          {chatHistory.map((chat, index) => (
            <div
              key={index}
              className={`flex items-end gap-2 ${
                chat.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {chat.role === "model" && (
                <div className="bg-purple-600 p-2 w-10 h-10 rounded-full">
                  <ChatbotIcon  />
                </div>
              )}

              <ChatMessage key={index} chat={chat} />
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        <ChatForm chatHistory={chatHistory} setChatHistory={setChatHistory} generateBotResponse={generateBotResponse} />

      </div>
    </div>
  );
};

export default ChatBox;