import { useState } from "react";
import { MessageCircle, X, Send, User, Bot } from "lucide-react";
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
  message: string;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! 👋 Welcome to Royal Agro Ventures. I'm here to help you with your enquiry. May I know your name?",
      isBot: true,
    },
  ]);
  const [input, setInput] = useState("");
  const [step, setStep] = useState(0);
  const [enquiry, setEnquiry] = useState<EnquiryData>({
    name: "",
    email: "",
    phone: "",
    product: "",
    message: "",
  });
  const { toast } = useToast();

  const steps = [
    { field: "name", question: "Great! Could you please share your email address?" },
    { field: "email", question: "Thank you! What's your phone number?" },
    { field: "phone", question: "Which product are you interested in? (Moringa, Tomato Flakes, Spices, Rice, Others)" },
    { field: "product", question: "Please share any additional message or specific requirements." },
    { field: "message", question: "Thank you for your enquiry! Our team will contact you shortly. Have a great day! 🌿" },
  ];

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      isBot: false,
    };

    setMessages((prev) => [...prev, userMessage]);

    const updatedEnquiry = { ...enquiry };
    const fields: (keyof EnquiryData)[] = ["name", "email", "phone", "product", "message"];
    updatedEnquiry[fields[step]] = input;
    setEnquiry(updatedEnquiry);

    setTimeout(async () => {
      if (step < steps.length) {
        const botResponse: Message = {
          id: messages.length + 2,
          text: steps[step].question,
          isBot: true,
        };
        setMessages((prev) => [...prev, botResponse]);
        
        if (step === steps.length - 1) {
          // Final step - save enquiry to database
          const { error } = await supabase.from("enquiries").insert({
            name: updatedEnquiry.name,
            email: updatedEnquiry.email,
            phone: updatedEnquiry.phone,
            product: updatedEnquiry.product,
            message: updatedEnquiry.message,
          });

          if (error) {
            console.error("Error saving enquiry:", error);
            toast({
              title: "Error",
              description: "Failed to submit enquiry. Please try again.",
              variant: "destructive",
            });
          } else {
            toast({
              title: "Enquiry Submitted!",
              description: "Thank you for reaching out. We'll get back to you soon.",
            });
          }
        }
        
        setStep((prev) => prev + 1);
      }
    }, 500);

    setInput("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSend();
    }
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
              <div>
                <h3 className="font-semibold">Royal Agro Ventures</h3>
                <p className="text-xs text-primary-foreground/70">Enquiry Assistant</p>
              </div>
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
                  <p className="text-sm">{message.text}</p>
                </div>
                {!message.isBot && (
                  <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                    <User size={16} className="text-accent-foreground" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Input */}
          {step < steps.length && (
            <div className="p-4 border-t border-border bg-background">
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 rounded-full"
                />
                <Button
                  onClick={handleSend}
                  size="icon"
                  className="rounded-full bg-accent hover:bg-accent/90"
                >
                  <Send size={18} />
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Chatbot;
