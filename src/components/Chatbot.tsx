import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, User, Bot, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Message {
  id: number;
  text: string;
  isBot: boolean;
}

interface EnquiryData {
  name: string;
  email: string;
  phone: string;
  product: string;
}

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/enquiry-chat`;

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [enquirySubmitted, setEnquirySubmitted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Initialize chat when opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      initializeChat();
    }
  }, [isOpen]);

  const initializeChat = async () => {
    setIsLoading(true);
    try {
      await streamChat({
        messages: [],
        onDelta: (chunk) => updateAssistantMessage(chunk),
        onDone: () => setIsLoading(false),
      });
    } catch (error) {
      console.error("Failed to initialize chat:", error);
      setMessages([{
        id: 1,
        text: "Hello! 👋 Welcome to Royal Agro Ventures. I'm here to help you with your enquiry. How can I assist you today?",
        isBot: true,
      }]);
      setIsLoading(false);
    }
  };

  const updateAssistantMessage = (chunk: string) => {
    setMessages((prev) => {
      const last = prev[prev.length - 1];
      if (last?.isBot) {
        return prev.map((m, i) => 
          i === prev.length - 1 ? { ...m, text: m.text + chunk } : m
        );
      }
      return [...prev, { id: prev.length + 1, text: chunk, isBot: true }];
    });
  };

  const streamChat = async ({
    messages: chatMessages,
    onDelta,
    onDone,
  }: {
    messages: { role: string; content: string }[];
    onDelta: (deltaText: string) => void;
    onDone: () => void;
  }) => {
    const resp = await fetch(CHAT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      },
      body: JSON.stringify({ messages: chatMessages }),
    });

    if (!resp.ok) {
      const errorData = await resp.json().catch(() => ({}));
      throw new Error(errorData.error || "Failed to get response");
    }

    if (!resp.body) throw new Error("No response body");

    const reader = resp.body.getReader();
    const decoder = new TextDecoder();
    let textBuffer = "";
    let fullResponse = "";
    let streamDone = false;

    while (!streamDone) {
      const { done, value } = await reader.read();
      if (done) break;
      textBuffer += decoder.decode(value, { stream: true });

      let newlineIndex: number;
      while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
        let line = textBuffer.slice(0, newlineIndex);
        textBuffer = textBuffer.slice(newlineIndex + 1);

        if (line.endsWith("\r")) line = line.slice(0, -1);
        if (line.startsWith(":") || line.trim() === "") continue;
        if (!line.startsWith("data: ")) continue;

        const jsonStr = line.slice(6).trim();
        if (jsonStr === "[DONE]") {
          streamDone = true;
          break;
        }

        try {
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content as string | undefined;
          if (content) {
            fullResponse += content;
            onDelta(content);
          }
        } catch {
          textBuffer = line + "\n" + textBuffer;
          break;
        }
      }
    }

    // Check for enquiry data in the full response
    await checkAndSaveEnquiry(fullResponse);
    onDone();
  };

  const checkAndSaveEnquiry = async (response: string) => {
    const match = response.match(/\[ENQUIRY_DATA\](.*?)\[\/ENQUIRY_DATA\]/);
    if (match) {
      try {
        const enquiryData: EnquiryData = JSON.parse(match[1]);
        
        const { error } = await supabase.from("enquiries").insert({
          name: enquiryData.name,
          email: enquiryData.email,
          phone: enquiryData.phone,
          product: enquiryData.product,
        });

        if (error) {
          console.error("Failed to save enquiry:", error);
          toast({
            title: "Error",
            description: "Failed to save your enquiry. Please try again.",
            variant: "destructive",
          });
        } else {
          setEnquirySubmitted(true);
          toast({
            title: "Enquiry Submitted!",
            description: "Thank you for reaching out. We'll get back to you soon.",
          });
        }
      } catch (e) {
        console.error("Failed to parse enquiry data:", e);
      }
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: input.trim(),
      isBot: false,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Build conversation history for AI
    const conversationHistory = [
      ...messages.map((m) => ({
        role: m.isBot ? "assistant" : "user",
        content: m.text,
      })),
      { role: "user", content: userMessage.text },
    ];

    try {
      await streamChat({
        messages: conversationHistory,
        onDelta: (chunk) => updateAssistantMessage(chunk),
        onDone: () => setIsLoading(false),
      });
    } catch (error) {
      console.error("Chat error:", error);
      setIsLoading(false);
      
      const errorMessage: Message = {
        id: messages.length + 2,
        text: "I'm sorry, I'm having trouble responding right now. Please try again in a moment.",
        isBot: true,
      };
      setMessages((prev) => [...prev, errorMessage]);
      
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to get response",
        variant: "destructive",
      });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const resetChat = () => {
    setMessages([]);
    setEnquirySubmitted(false);
    initializeChat();
  };

  // Clean display text (remove enquiry data markers)
  const cleanText = (text: string) => {
    return text.replace(/\[ENQUIRY_DATA\].*?\[\/ENQUIRY_DATA\]/g, "").trim();
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-accent hover:bg-accent/90 text-accent-foreground rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110"
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-3rem)] bg-background rounded-2xl shadow-2xl border border-border overflow-hidden animate-scale-in">
          {/* Header */}
          <div className="bg-primary text-primary-foreground p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
                <Bot size={20} className="text-accent-foreground" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">Royal Agro Ventures</h3>
                <p className="text-xs text-primary-foreground/70">AI Assistant</p>
              </div>
              {enquirySubmitted && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={resetChat}
                  className="text-primary-foreground hover:bg-primary-foreground/10"
                >
                  New Chat
                </Button>
              )}
            </div>
          </div>

          {/* Messages */}
          <div className="h-80 overflow-y-auto p-4 space-y-4 bg-muted/30">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-2 ${message.isBot ? "justify-start" : "justify-end"}`}
              >
                {message.isBot && (
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot size={16} className="text-primary-foreground" />
                  </div>
                )}
                <div
                  className={`max-w-[75%] p-3 rounded-2xl ${
                    message.isBot
                      ? "bg-background text-foreground rounded-tl-none"
                      : "bg-primary text-primary-foreground rounded-tr-none"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{cleanText(message.text)}</p>
                </div>
                {!message.isBot && (
                  <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                    <User size={16} className="text-accent-foreground" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && messages.length > 0 && messages[messages.length - 1]?.isBot === false && (
              <div className="flex gap-2 justify-start">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot size={16} className="text-primary-foreground" />
                </div>
                <div className="bg-background text-foreground rounded-2xl rounded-tl-none p-3">
                  <Loader2 className="w-4 h-4 animate-spin" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border bg-background">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 rounded-full"
                disabled={isLoading}
              />
              <Button
                onClick={handleSend}
                size="icon"
                className="rounded-full bg-accent hover:bg-accent/90"
                disabled={isLoading || !input.trim()}
              >
                {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
