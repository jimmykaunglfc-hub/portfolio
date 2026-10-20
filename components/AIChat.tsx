"use client";

import { useChat } from "@ai-sdk/react";
import { type UIMessage, DefaultChatTransport } from "ai";
import { useState, useRef, useEffect } from "react";
import { X, Send, User, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import ScouseMascot from './ScouseMascot';

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
            setMessages((prevMessages: UIMessage[]) => [
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
              setHasUnread(false);
              // 🔓 THE HACK: Silently unlock audio when user first opens the chat
              if (audioRef.current) {
                audioRef.current.play().then(() => {
                  audioRef.current?.pause();
                  if (audioRef.current) audioRef.current.currentTime = 0;
                }).catch(() => {});
              }
            }}
            className="scouse-launcher"
            type="button"
            aria-haspopup="dialog"
            aria-label={hasUnread ? 'Open Scouse chat — unread reply' : 'Chat with Scouse, Jimmy’s AI portfolio guide'}
            title="Chat with Scouse"
          >
            <ScouseMascot size={128} animated />
            {hasUnread && <span className="scouse-launcher__unread" aria-hidden="true" />}
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
            className="scouse-panel fixed bottom-4 right-4 md:bottom-6 md:right-6 w-[calc(100vw-2rem)] md:w-[380px] h-[70vh] md:h-[570px] max-h-[85vh] bg-white dark:bg-[#0c1122] border border-[#0d1020]/10 dark:border-white/10 shadow-2xl z-[9999] flex flex-col overflow-hidden font-sans"
            role="dialog"
            aria-label="Chat with Scouse"
          >
            <div className="scouse-header">
              <div className="flex items-center gap-3">
                <ScouseMascot size={44} />
                <div>
                  <h3>Scouse</h3>
                  <p>Jimmy’s AI portfolio guide</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                aria-label="Close Scouse chat"
                className="text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-white/10 p-1.5 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-5 bg-[#f2f5ff]/70 dark:bg-[#070b16] scroll-smooth">
              {messages.length === 0 && (
                <div className="scouse-introduction flex flex-col items-center justify-center h-full text-center px-4">
                  <ScouseMascot size={100} />
                  <p className="text-lg font-medium text-gray-900 dark:text-white mb-2">Hi, I’m Scouse.</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                    I’m Jimmy’s AI portfolio guide. Ask me about his experience, explore his articles, or get a hint for a Lab game.
                  </p>
                </div>
              )}
              
              {messages.map((m) => {
                const isUser = m.role === 'user';
                return (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={m.id} 
                    className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
                  >
                    <div className={`w-8 h-8 rounded-sm flex-shrink-0 flex items-center justify-center ${isUser ? 'bg-[#8ebaff] text-[#10170a]' : 'bg-gray-200 dark:bg-[#101828] border border-gray-300 dark:border-white/10 text-gray-600 dark:text-gray-400'}`}>
                      {isUser ? <User className="w-4 h-4" /> : <ScouseMascot size={32} />}
                    </div>
                    
                    <div className={`scouse-message max-w-[75%] p-3.5 text-sm leading-relaxed break-words ${isUser ? 'bg-[#8ebaff] text-[#10170a] rounded-xl shadow-md' : 'bg-white dark:bg-[#101828] border border-gray-200 dark:border-white/10 text-gray-800 dark:text-gray-200 rounded-xl shadow-sm'}`}>
                      {m.parts && m.parts.length > 0 
                        ? m.parts.map((part, i: number) => part.type === 'text' ? <span key={i}>{part.text}</span> : null)
                        : null
                      }
                    </div>
                  </motion.div>
                );
              })}
              
              {isLoading && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
                  <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center bg-gray-200 dark:bg-[#121214] border border-gray-300 dark:border-white/10">
                     <ScouseMascot size={32} />
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
                    <span>Scouse couldn’t connect. Please try again in a moment.</span>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={onSubmit} className="p-4 bg-white dark:bg-[#0c1122] border-t border-gray-200 dark:border-white/10">
              <div className="relative flex items-center bg-gray-100 dark:bg-[#101828] border border-gray-200 dark:border-white/10 rounded-sm overflow-hidden focus-within:ring-2 focus-within:ring-[#8ebaff]/50 focus-within:border-[#8ebaff] transition-all">
                <input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask Scouse…"
                  aria-label="Message Scouse"
                  disabled={isLoading}
                  className="flex-1 bg-transparent border-none px-4 py-3 text-sm focus:outline-none text-gray-900 dark:text-white placeholder-gray-500 disabled:opacity-50"
                />
                <button 
                  type="submit" 
                  aria-label="Send message to Scouse"
                  disabled={isLoading || !inputValue.trim()}
                  className="mr-2 p-2 rounded-sm bg-[#8ebaff] text-[#10170a] disabled:bg-gray-300 dark:disabled:bg-white/10 disabled:text-gray-500 transition-all hover:bg-[#b9d5ff] active:scale-95 flex items-center justify-center"
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
