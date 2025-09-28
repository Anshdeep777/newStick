'use client';

import { useState, useRef, useEffect } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import { RiGeminiFill } from "react-icons/ri";
import { BsGraphUpArrow, BsArrowDown, BsNewspaper } from "react-icons/bs";
import { AiOutlineLineChart } from "react-icons/ai";
import ReactMarkdown from 'react-markdown';
import { BsArrowUpRightCircleFill } from "react-icons/bs";

const AiPopup = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    { from: 'ai', text: 'How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const messagesEndRef = useRef(null);

  const quickReplies = [
    { icon: <BsGraphUpArrow />, text: "Stock prices today" },
    { icon: <BsArrowDown />, text: "Top gainers and losers" },
    { icon: <BsNewspaper />, text: "Latest business news" },
     
  ];

  const apiKey = "YOUR_GOOGLE_API_KEY"; // replace with your key
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { from: 'user', text: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setLoading(true);

    if (inputRef.current) inputRef.current.innerText = '';
    setInput('');

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: input,
          temperature: 0.7,
          candidateCount: 1,
          maxOutputTokens: 500
        })
      });

      const data = await response.json();
      const aiText = data?.candidates?.[0]?.content?.[0]?.text || 
                     "Sorry, I couldn't understand that.";

      setMessages([...updatedMessages, { from: 'ai', text: aiText }]);
    } catch (err) {
      console.error(err);
      setMessages([...updatedMessages, { from: 'ai', text: 'Error connecting to AI API.' }]);
    }

    setLoading(false);
  };

  const handleQuickReply = (text) => {
    setInput(text);
    if (inputRef.current) {
      inputRef.current.innerText = text;
      inputRef.current.focus();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-3xl shadow-2xl p-6 w-[600px] max-w-[90%] h-[80vh] flex flex-col border border-green-500/30 relative">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-red-500 hover:text-red-600"
        >
          <AiFillCloseCircle size={30} />
        </button>

        {/* Header */}
        <h2 className="text-2xl text-white font-bold mb-4 flex items-center gap-2">
          <RiGeminiFill className="text-3xl" /> AI Assistant
        </h2>

        {/* Messages */}
        <div className="flex-1 mb-2 overflow-y-auto p-2 rounded-lg">
          {messages.map((msg, idx) => (
            <div key={idx}>
              {msg.from === 'ai' ? (
                <div className="flex flex-col items-start gap-2 text-green-400 mb-2">
                  <div className="border border-green-400 rounded-full p-2 flex items-center justify-center w-10 h-10">
                    <RiGeminiFill className="text-xl" />
                  </div>
                  <div className="bg-gray-800 rounded-xl p-3 max-w-[80%]">
                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-end mb-2">
                  <div className="bg-green-600 text-white rounded-xl p-3 max-w-[80%]">
                    {msg.text}
                  </div>
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef}></div>

          {loading && (
            <div className="flex justify-center mt-2">
              <RiGeminiFill className="text-green-400 text-4xl" style={{ animation: 'spin 2s linear infinite' }} />
            </div>
          )}
        </div>

        {/* Quick Replies */}
        <div className="flex gap-2 mb-2 flex-wrap">
          {quickReplies.map((reply, idx) => (
            <button
              key={idx}
              onClick={() => handleQuickReply(reply.text)}
              className="px-3 py-2 bg-blue-800 text-white rounded-full hover:bg-blue-900 text-sm flex items-center gap-1"
            >
              {reply.icon}
              {reply.text}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="flex gap-3 mt-2">
          <div
            ref={inputRef}
            className="flex-1 p-3 rounded-lg bg-gray-800 text-white text-sm min-h-[50px] max-h-[120px] overflow-y-auto"
            contentEditable
            suppressContentEditableWarning
            onInput={(e) => setInput(e.currentTarget.innerText)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          ></div>
          <button
  onClick={handleSend}
  disabled={loading}
  className="text-3xl rounded-lg font-semibold hover:rotate-45 transition-transform duration-300"
>
  <BsArrowUpRightCircleFill />
</button>

        </div>
      </div>

      {/* Spinner keyframes */}
      <style jsx global>{`
        @keyframes spin {
          0% { transform: rotate(0deg);}
          100% { transform: rotate(360deg);}
        }
      `}</style>
    </div>
  );
};

export default AiPopup;
