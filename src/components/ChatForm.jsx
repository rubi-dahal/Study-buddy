import React, { useRef } from 'react'
import { IoSend } from 'react-icons/io5';

const ChatForm = ({chatHistory, setChatHistory, generateBotResponse}) => {

    
    const inputRef = useRef();

  const handleFormSubmit = (e) =>{
    e.preventDefault();
    const userMessage = inputRef.current.value.trim();
    if(!userMessage) return;
    inputRef.current.value= "";
    const updatedHistory = [...chatHistory, {role:"user", text: userMessage}];
    setChatHistory([...updatedHistory, {role:"model", text: "Thinking..."}])
    
    setTimeout(()=>{
        generateBotResponse(updatedHistory)
    },600)

  }
  return (
    <form className="p-4" onSubmit={handleFormSubmit}>

          <div className="flex items-center bg-white/10 border border-gray-700 rounded-2xl px-3 py-2 focus-within:border-purple-500 transition">

            <input
              type="text"
              ref={inputRef}
              placeholder="Ask anything..."
              className="flex-1 bg-transparent outline-none text-gray-200 placeholder-gray-400 px-2"
              required
            />

            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 transition p-3 rounded-xl text-white text-lg"
            >
              <IoSend />
            </button>

          </div>

        </form>
  )
}

export default ChatForm