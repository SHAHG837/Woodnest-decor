import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Sparkles, Loader2, Minimize2 } from "lucide-react";

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export default function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: "Hello! I am Woody, your WoodNest design assistant. I can help you select the perfect wooden finish, recommend plaques for your entryway, or give you advice on our handcrafted MDF processing! Ask me anything."
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const presetSuggestions = [
    "What wood stains are available?",
    "Recommend a key holder stand",
    "How do I clean my MDF plaque?",
    "Can I customize sizes?"
  ];

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = { role: 'user', content: textToSend };
    setMessages(prev => [...prev, userMsg]);
    setInputValue("");
    setIsLoading(true);

    try {
      // Package conversation history
      const formattedHistory = [...messages, userMsg].map(msg => ({
        role: msg.role === 'assistant' ? 'assistant' : 'user',
        content: msg.content
      }));

      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: formattedHistory })
      });

      const data = await response.json();
      if (data.reply) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
      } else if (data.error) {
        setMessages(prev => [...prev, { role: 'assistant', content: "I encountered a slight knot in my systems. Please try again! Error: " + data.error }]);
      }
    } catch (err) {
      console.error("Chat error:", err);
      setMessages(prev => [...prev, { role: 'assistant', content: "My wood grains seem to be experiencing high humidity (connection drop). Please retry in a moment!" }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputValue);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating launcher badge */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center space-x-2 px-5 py-4 rounded-full bg-wood-dark hover:bg-wood-primary text-[#F8F4EC] shadow-2xl transition-all hover:scale-105 duration-300 group cursor-pointer border border-wood-gold/30"
        >
          <div className="relative">
            <MessageSquare className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-wood-gold rounded-full animate-ping" />
          </div>
          <span className="font-display text-xs font-bold tracking-wider uppercase">Chat with Woody AI</span>
        </button>
      )}

      {/* Floating Chat Drawer UI (Glassmorphism) */}
      {isOpen && (
        <div className="w-80 sm:w-96 h-[500px] glass-wood-panel rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between border border-wood-primary/20 animate-in slide-in-from-bottom-5 duration-300">
          
          {/* Header */}
          <div className="bg-wood-dark text-wood-cream p-4 flex items-center justify-between border-b border-wood-gold/20">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-wood-gold/25 flex items-center justify-center border border-wood-gold/30">
                <Sparkles className="w-4.5 h-4.5 text-wood-gold" />
              </div>
              <div>
                <span className="font-serif text-sm font-bold text-white block">Woody AI Assistant</span>
                <span className="text-[9px] font-sans text-wood-gold tracking-widest uppercase block">WoodNest Ambassador</span>
              </div>
            </div>
            
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full hover:bg-white/10 text-white/70 transition-colors"
            >
              <Minimize2 className="w-4 h-4" />
            </button>
          </div>

          {/* Messages display */}
          <div className="flex-grow p-4 overflow-y-auto space-y-4 bg-[#F8F4EC]/60">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl p-3.5 text-xs font-sans leading-relaxed shadow-sm ${
                    msg.role === 'user'
                      ? 'bg-wood-primary text-white rounded-tr-none'
                      : 'bg-white text-wood-charcoal rounded-tl-none border border-wood-primary/10'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white text-wood-charcoal rounded-2xl rounded-tl-none p-3 border border-wood-primary/10 flex items-center space-x-2">
                  <Loader2 className="w-4 h-4 animate-spin text-wood-primary" />
                  <span className="text-[10px] font-sans font-light text-wood-charcoal/60">Woody is crafting response...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Pre-fill Clickable suggestions */}
          {messages.length === 1 && (
            <div className="px-4 py-2 bg-white/40 border-t border-wood-primary/5 flex flex-wrap gap-1.5 justify-center">
              {presetSuggestions.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(s)}
                  className="px-2.5 py-1 rounded-full bg-white hover:bg-wood-primary hover:text-white border border-wood-primary/15 text-[9px] font-display font-medium text-wood-charcoal transition-colors cursor-pointer"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input form */}
          <form onSubmit={handleFormSubmit} className="p-3.5 bg-white border-t border-wood-primary/10 flex items-center space-x-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask Woody anything..."
              className="flex-grow px-4 py-2.5 rounded-xl border border-wood-primary/15 bg-[#F8F4EC]/40 focus:outline-none focus:ring-2 focus:ring-wood-primary/40 text-xs font-sans text-wood-charcoal"
            />
            <button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              className="p-2.5 rounded-xl bg-wood-dark hover:bg-wood-primary text-white transition-all cursor-pointer disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </div>
  );
}
