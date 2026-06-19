"use client";

import { useChat } from "@ai-sdk/react";
import { type UIMessage, DefaultChatTransport } from "ai";
import { useState } from "react";
import { MessageSquare, X, Send, Bot } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  
  // Wrap the api endpoint inside the new DefaultChatTransport object
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/chat'
    })
  });

  const isLoading = status === "submitted" || status === "streaming";

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;
    
    sendMessage({ 
      role: "user", 
      parts: [{ type: "text", text: inputValue }] 
    });
    setInputValue("");
  };

  return (
    <>
      {/* Floating Action Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 p-4 bg-blue-500 text-white rounded-full shadow-2xl hover:scale-110 transition-transform z-50 ${isOpen ? 'hidden' : 'block'}`}
      >
        <MessageSquare className="w-6 h-6" />
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 w-[350px] h-[500px] bg-white dark:bg-[#121214] border border-gray-200 dark:border-white/10 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden font-sans"
          >
            {/* Header */}
            <div className="bg-blue-500 p-4 text-white flex justify-between items-center">
              <div className="flex items-center gap-2 font-bold">
                <Bot className="w-5 h-5" /> Portfolio AI
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:bg-blue-600 p-1 rounded-md transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-[#09090b]">
              {messages.length === 0 && (
                <div className="text-center text-gray-500 dark:text-gray-400 text-sm mt-4">
                  Ask me about my background, read a blog summary, or get a game hint!
                </div>
              )}
              {messages.map((m: UIMessage) => (
                <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${m.role === 'user' ? 'bg-blue-500 text-white rounded-br-sm' : 'bg-white dark:bg-[#121214] border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white rounded-bl-sm shadow-sm'}`}>
                    {m.parts?.map((part: any, i: number) => 
                      part.type === 'text' ? <span key={i}>{part.text}</span> : null
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white dark:bg-[#121214] border border-gray-200 dark:border-white/10 p-4 rounded-2xl rounded-bl-sm flex gap-1.5">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <form onSubmit={onSubmit} className="p-3 bg-white dark:bg-[#121214] border-t border-gray-200 dark:border-white/10 flex gap-2">
              <input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1 bg-gray-100 dark:bg-white/5 border-none rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
              />
              <button 
                type="submit" 
                disabled={isLoading || !inputValue.trim()}
                className="bg-blue-500 text-white p-2 rounded-xl hover:bg-blue-600 disabled:opacity-50 transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}