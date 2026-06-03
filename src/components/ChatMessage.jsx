import React from 'react'

const ChatMessage = ({ chat }) => {
  return (
    <div
      className={`max-w-[75%] px-3 py-1 rounded-2xl text-sm leading-6 ${
        chat.role === "user"
          ? "bg-purple-600 text-white rounded-br-sm"
          : "bg-white/10 text-gray-200 border border-gray-700 rounded-bl-sm"
      }`}
    >
      {chat.text}
    </div>
  );
};

export default ChatMessage;