"use client";

import { useChat } from "@ai-sdk/react";
import { type UIMessage, DefaultChatTransport } from "ai";
import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Sparkles, User, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase for Realtime Listening
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function AIChat() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(false); // Tracks unread admin replies
  const [inputValue, setInputValue] = useState("");
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null); // NEW: Reference for the hidden audio player
  
  // Track open state in a ref for the realtime listener to access without re-subscribing
  const isOpenRef = useRef(isOpen);
  useEffect(() => {
    isOpenRef.current = isOpen;
    if (isOpen) setHasUnread(false); // Clear unread badge when opened
  }, [isOpen]);
  
  // 1. GENERATE A STABLE SESSION ID
  const [sessionId] = useState(() => `session-${Date.now()}-${Math.floor(Math.random() * 10000)}`);
  
  // 2. USE THE STRICT TRANSPORT API & PASS SESSION ID IN URL
  const { messages, setMessages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({
      api: `/api/chat?sessionId=${sessionId}` 
    })
  });

  const isLoading = status === "submitted" || status === "streaming";

  // 3. THE REALTIME LISTENER WITH SOUND & BADGE
  useEffect(() => {
    if (!supabaseUrl || !supabaseKey) return;

    const channel = supabase
      .channel('admin_replies')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_history',
          filter: `session_id=eq.${sessionId}` 
        },
        (payload) => {
          const newRow = payload.new;
          if (newRow.user_message === 'SYSTEM_ADMIN_OVERRIDE') {
            
            // 🔊 PLAY NOTIFICATION SOUND VIA REF
            if (audioRef.current) {
              audioRef.current.volume = 0.8;
              const playPromise = audioRef.current.play();
              if (playPromise !== undefined) {
                playPromise.catch((err) => {
                  console.warn("Browser blocked the audio, or file is missing:", err);
                });
              }
            }

            // 🔴 TRIGGER UNREAD BADGE IF CHAT IS CLOSED
            if (!isOpenRef.current) {
              setHasUnread(true);
            }

            // Append the message to the UI
            setMessages((prevMessages: any[]) => [
              ...prevMessages,
              {
                id: newRow.id || Date.now().toString(),
                role: 'assistant',
                parts: [{ type: 'text', text: newRow.ai_response }]
              }
            ]);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [sessionId, setMessages]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading, error]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;
    
    // 🔓 THE HACK: Silently unlock audio when user sends a message
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        audioRef.current?.pause();
        if (audioRef.current) audioRef.current.currentTime = 0;
      }).catch(() => {});
    }

    sendMessage({ text: inputValue });
    setInputValue("");
  };

  if (pathname?.startsWith('/studio') || pathname?.startsWith('/admin') || pathname?.startsWith('/games')) return null;

  return (
    <>
      {/* 🔊 Hidden Audio Element preloaded by the browser */}
      <audio ref={audioRef} src="/sounds/notification.mp3" preload="auto" />

      <AnimatePresence>
        {!isOpen && (
          <motion.button 
            drag
            dragMomentum={false}
            style={{ touchAction: "none" }} 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => {
              setIsOpen(true);
              // 🔓 THE HACK: Silently unlock audio when user first opens the chat
              if (audioRef.current) {
                audioRef.current.play().then(() => {
                  audioRef.current?.pause();
                  if (audioRef.current) audioRef.current.currentTime = 0;
                }).catch(() => {});
              }
            }}
            className="fixed bottom-[6.5rem] right-4 md:bottom-6 md:right-6 p-3.5 md:p-4 rounded-full z-[9999] transition-colors transition-shadow duration-300 bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.5)] hover:shadow-[0_0_30px_rgba(59,130,246,0.8)] group cursor-grab active:cursor-grabbing"
          >
            <div className="relative">
              <MessageSquare className="w-6 h-6 md:w-6 md:h-6 group-hover:scale-110 transition-transform duration-300 pointer-events-none" />
              
              {/* Pulsing Red Unread Badge */}
              {hasUnread && (
                <span className="absolute -top-2 -right-2 flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 border-2 border-white dark:border-[#09090b]"></span>
                </span>
              )}
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 20, scale: 0.95, filter: "blur(10px)" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-[6rem] right-4 md:bottom-6 md:right-6 w-[calc(100vw-2rem)] md:w-[360px] h-[70vh] md:h-[550px] max-h-[85vh] bg-white dark:bg-[#09090b] border border-gray-200 dark:border-white/10 rounded-2xl shadow-2xl z-[9999] flex flex-col overflow-hidden font-sans"
          >
            <div className="px-5 py-4 border-b border-gray-200 dark:border-white/10 bg-gray-50/80 dark:bg-[#121214]/80 backdrop-blur-md flex justify-between items-center relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                  <Sparkles className="w-4 h-4 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-gray-900 dark:text-white leading-none">Portfolio AI</h3>
                  <p className="text-[11px] text-green-500 font-medium mt-1 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span> Online
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-white/10 p-1.5 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-5 bg-slate-50 dark:bg-[#09090b] scroll-smooth">
              {messages.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full text-center px-4 opacity-70">
                  <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-4">
                    <MessageSquare className="w-6 h-6 text-blue-500" />
                  </div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">Welcome to my portfolio!</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                    I'm a custom AI assistant. Ask me about my creator's background, get a summary of a blog post, or ask for hints on the arcade games!
                  </p>
                </div>
              )}
              
              {messages.map((m: any) => {
                const isUser = m.role === 'user';
                return (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={m.id} 
                    className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
                  >
                    <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${isUser ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-[#121214] border border-gray-300 dark:border-white/10 text-gray-600 dark:text-gray-400'}`}>
                      {isUser ? <User className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
                    </div>
                    
                    <div className={`max-w-[75%] p-3.5 text-sm leading-relaxed break-words ${isUser ? 'bg-blue-600 text-white rounded-2xl rounded-tr-sm shadow-md' : 'bg-white dark:bg-[#121214] border border-gray-200 dark:border-white/10 text-gray-800 dark:text-gray-200 rounded-2xl rounded-tl-sm shadow-sm'}`}>
                      {m.parts && m.parts.length > 0 
                        ? m.parts.map((part: any, i: number) => part.type === 'text' ? <span key={i}>{part.text}</span> : null)
                        : m.content
                      }
                    </div>
                  </motion.div>
                );
              })}
              
              {isLoading && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
                  <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center bg-gray-200 dark:bg-[#121214] border border-gray-300 dark:border-white/10">
                     <Sparkles className="w-4 h-4 text-blue-500" />
                  </div>
                  <div className="bg-white dark:bg-[#121214] border border-gray-200 dark:border-white/10 p-4 rounded-2xl rounded-tl-sm flex gap-1.5 items-center shadow-sm">
                    <span className="w-1.5 h-1.5 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-1.5 h-1.5 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </motion.div>
              )}

              {error && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-center mt-4">
                  <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-xs px-4 py-3 rounded-xl flex items-center gap-2 max-w-[90%] font-mono break-all">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>Engine Error: {error.message || "Unknown dynamic network crash"}</span>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={onSubmit} className="p-4 bg-white dark:bg-[#09090b] border-t border-gray-200 dark:border-white/10">
              <div className="relative flex items-center bg-gray-100 dark:bg-[#121214] border border-gray-200 dark:border-white/10 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-blue-500/50 focus-within:border-blue-500 transition-all">
                <input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type a message..."
                  disabled={isLoading}
                  className="flex-1 bg-transparent border-none px-4 py-3 text-sm focus:outline-none text-gray-900 dark:text-white placeholder-gray-500 disabled:opacity-50"
                />
                <button 
                  type="submit" 
                  disabled={isLoading || !inputValue.trim()}
                  className="mr-2 p-2 rounded-lg bg-blue-500 text-white disabled:bg-gray-300 dark:disabled:bg-white/10 disabled:text-gray-500 transition-all hover:bg-blue-600 active:scale-95 flex items-center justify-center"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}