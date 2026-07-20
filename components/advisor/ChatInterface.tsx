"use client";

import { useState, useRef, useEffect } from "react";
import { useChat } from "ai/react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Mic, Globe2, StopCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import FDBookingFlow from "./FDBookingFlow";

const LANGUAGES = {
  en: { name: "English", placeholder: "Ask about Fixed Deposits...", label: "Speak in English" },
  hi: { name: "हिंदी", placeholder: "फिक्स्ड डिपॉजिट के बारे में पूछें...", label: "हिंदी में बोलें" },
  mr: { name: "मराठी", placeholder: "फिक्स्ड डिपॉझिट बद्दल विचारा...", label: "मराठीत बोला" }
};

export default function ChatInterface() {
  const [lang, setLang] = useState<"en" | "hi" | "mr">("en");
  const [isRecording, setIsRecording] = useState(false);
  const [showBooking, setShowBooking] = useState(false);
  
  const { messages, input, handleInputChange, handleSubmit, setInput, isLoading } = useChat({
    body: { language: LANGUAGES[lang].name },
    onFinish: (message) => {
      if (message.content.includes("[TRIGGER_BOOKING]")) {
        setTimeout(() => setShowBooking(true), 1500);
        speakResponse(message.content.replace("[TRIGGER_BOOKING]", ""));
      } else {
        speakResponse(message.content);
      }
    }
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Speech Recognition
  const startRecording = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return alert("Browser does not support voice input.");
    
    const recognition = new SpeechRecognition();
    recognition.lang = lang === "hi" ? "hi-IN" : lang === "mr" ? "mr-IN" : "en-IN";
    
    recognition.onstart = () => setIsRecording(true);
    recognition.onresult = (e: any) => {
      const transcript = e.results[0][0].transcript;
      setInput(transcript);
      // Auto submit after small delay
      setTimeout(() => {
        document.getElementById("chat-form")?.dispatchEvent(
          new Event("submit", { cancelable: true, bubbles: true })
        );
      }, 500);
    };
    recognition.onend = () => setIsRecording(false);
    recognition.start();
  };

  // Speech Synthesis
  const speakResponse = (text: string) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === "hi" ? "hi-IN" : lang === "mr" ? "mr-IN" : "en-IN";
    window.speechSynthesis.speak(utterance);
  };

  if (showBooking) {
    return <FDBookingFlow onBack={() => setShowBooking(false)} language={lang} />;
  }

  return (
    <div className="flex flex-col w-full flex-grow bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden relative">
      {/* Language Selector */}
      <div className="absolute top-4 right-4 z-10 flex gap-2">
        <div className="bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-200 shadow-sm flex items-center gap-2">
          <Globe2 size={14} className="text-blostem-700" />
          <select 
            value={lang} 
            onChange={(e) => setLang(e.target.value as any)}
            className="text-xs font-medium bg-transparent outline-none cursor-pointer"
          >
            <option value="en">English</option>
            <option value="hi">हिंदी (Hindi)</option>
            <option value="mr">मराठी (Marathi)</option>
          </select>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-grow p-4 md:p-6 overflow-y-auto space-y-4 pt-16 pb-24">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-4 text-slate-500 mt-10">
            <div className="w-16 h-16 bg-blostem-50 rounded-full flex items-center justify-center">
              <Mic className="text-blostem-700" size={28} />
            </div>
            <div>
              <p className="font-semibold text-slate-800 text-lg">Hello! I am VaniNivesh.</p>
              <p className="text-sm mt-1">{LANGUAGES[lang].label} about growing your wealth.</p>
            </div>
            <div className="flex flex-wrap justify-center gap-2 mt-4 max-w-sm">
              <span className="text-xs bg-slate-100 px-3 py-1.5 rounded-full">"I want to save 1 Lakh"</span>
              <span className="text-xs bg-slate-100 px-3 py-1.5 rounded-full">"Best FD rates right now?"</span>
            </div>
          </div>
        )}

        <AnimatePresence>
          {messages.map((m) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={m.id}
              className={`flex flex-col ${m.role === "user" ? "items-end" : "items-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-5 py-3.5 text-[15px] leading-relaxed shadow-sm ${
                  m.role === "user"
                    ? "bg-blostem-700 text-white rounded-br-none"
                    : "bg-slate-50 border border-slate-100 text-slate-800 rounded-bl-none"
                }`}
              >
                {m.content.replace("[TRIGGER_BOOKING]", "")}
              </div>
            </motion.div>
          ))}
          {isLoading && (
            <motion.div className="flex items-start">
              <div className="bg-slate-50 border border-slate-100 rounded-2xl rounded-bl-none px-5 py-4 flex gap-1">
                <div className="w-2 h-2 rounded-full bg-slate-300 animate-bounce"></div>
                <div className="w-2 h-2 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                <div className="w-2 h-2 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: "0.4s" }}></div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-white via-white to-transparent pt-10">
        <form id="chat-form" onSubmit={handleSubmit} className="flex gap-2 items-center max-w-full">
          <Button 
            type="button"
            variant="outline"
            size="icon"
            onClick={isRecording ? undefined : startRecording}
            className={`rounded-full h-12 w-12 shrink-0 border-2 ${isRecording ? 'border-red-500 text-red-500 animate-pulse bg-red-50' : 'border-slate-200 text-slate-500 hover:text-blostem-700 hover:border-blostem-200'}`}
          >
            {isRecording ? <StopCircle size={22} /> : <Mic size={22} />}
          </Button>
          
          <div className="relative flex-grow">
            <input
              className="w-full h-12 bg-slate-50 border border-slate-200 rounded-full pl-5 pr-12 text-[15px] focus:outline-none focus:border-blostem-500 focus:ring-2 focus:ring-blostem-100 transition-all"
              value={input}
              onChange={handleInputChange}
              placeholder={isRecording ? "Listening..." : LANGUAGES[lang].placeholder}
              disabled={isLoading || isRecording}
            />
            <Button 
              type="submit" 
              size="icon" 
              className="absolute right-1 top-1 bottom-1 h-10 w-10 rounded-full bg-blostem-700 hover:bg-blostem-800"
              disabled={isLoading || !input.trim()}
            >
              <Send size={18} className="text-white ml-0.5" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
