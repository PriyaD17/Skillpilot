import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, User, Bot, Sparkles, ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Markdown from "react-markdown";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { getChatResponseStream } from "@/lib/gemini";

interface Message {
  role: "user" | "model";
  content: string;
}

interface ChatbotProps {
  onBack: () => void;
}

export const Chatbot: React.FC<ChatbotProps> = ({ onBack }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "model",
      content: "Hi there! I'm SkillPilot, your career guide. Are you currently in 10th or 12th grade, or just looking for some general career advice?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const chatHistory = [...messages, userMessage];
      const stream = await getChatResponseStream(chatHistory);
      
      // Add an empty message for the model that we will update as chunks arrive
      setMessages((prev) => [...prev, { role: "model", content: "" }]);
      setIsLoading(false); // Stop the loading spinner since we are receiving data

      let fullResponse = "";
      for await (const chunk of stream) {
        if (chunk.text) {
          fullResponse += chunk.text;
          setMessages((prev) => {
            const newMessages = [...prev];
            newMessages[newMessages.length - 1].content = fullResponse;
            return newMessages;
          });
        }
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "model", content: "I'm sorry, I encountered an error. Please try again." },
      ]);
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex h-screen w-full flex-col bg-black text-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
         <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-orange-500/5 blur-[100px]" />
         <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] rounded-full bg-blue-500/5 blur-[100px]" />
      </div>

      {/* Header */}
      <header className="z-10 flex items-center justify-between border-b border-white/10 bg-black/50 px-6 py-4 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onBack} className="text-gray-400 hover:text-white hover:bg-white/10">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-orange-600 shadow-lg shadow-orange-500/20">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold tracking-tight">SkillPilot</h2>
              <p className="text-xs text-orange-400 font-medium">AI Career Guide</p>
            </div>
          </div>
        </div>
      </header>

      {/* Chat Area */}
      <div ref={scrollRef} className="z-10 flex-1 min-h-0 overflow-y-auto px-4 py-6 md:px-8 scroll-smooth">
        <div className="mx-auto max-w-3xl space-y-6">
          <AnimatePresence initial={false}>
            {messages.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.3 }}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className={`flex max-w-[85%] gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                  <Avatar className={`h-8 w-8 border ${msg.role === "user" ? "border-blue-500/30" : "border-orange-500/30"}`}>
                    <AvatarFallback className={msg.role === "user" ? "bg-blue-600" : "bg-orange-600"}>
                      {msg.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                    </AvatarFallback>
                  </Avatar>
                  <Card className={`p-4 shadow-xl ${
                    msg.role === "user" 
                      ? "bg-blue-600/10 border-blue-500/20 text-blue-50" 
                      : "bg-white/5 border-white/10 text-gray-200"
                  }`}>
                    <div className="prose prose-invert prose-sm max-w-none leading-relaxed">
                      <Markdown>{msg.content}</Markdown>
                    </div>
                  </Card>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="flex gap-3">
                <Avatar className="h-8 w-8 border border-orange-500/30">
                  <AvatarFallback className="bg-orange-600">
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex items-center gap-2 rounded-2xl bg-white/5 border border-white/10 px-4 py-2 text-gray-400">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-sm font-medium">SkillPilot is thinking...</span>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Input Area */}
      <footer className="z-10 border-t border-white/10 bg-black/50 p-4 backdrop-blur-md md:p-6">
        <div className="mx-auto max-w-3xl">
          <div className="relative flex items-center gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask about careers, courses, or exams..."
              className="h-12 border-white/10 bg-white/5 pl-4 pr-12 text-white placeholder:text-gray-500 focus-visible:ring-orange-500/50"
            />
            <Button
              size="icon"
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="absolute right-1.5 h-9 w-9 bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/20"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="mt-2 text-center text-[10px] text-gray-500 uppercase tracking-widest font-medium">
            Powered by SkillPilot AI • Guided Career Discovery
          </p>
        </div>
      </footer>
    </div>
  );
};
