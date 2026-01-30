import { useState, useRef } from "react";
import { MessageCircle, X, Send, User, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

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

// Validation schemas for each field
const nameSchema = z
  .string()
  .trim()
  .min(2, "Name must be at least 2 characters")
  .max(100, "Name must be less than 100 characters")
  .regex(/^[a-zA-Z\s\-'.]+$/, "Name can only contain letters, spaces, hyphens, apostrophes, and periods");

const emailSchema = z
  .string()
  .trim()
  .email("Please enter a valid email address")
  .max(255, "Email must be less than 255 characters");

const phoneSchema = z
  .string()
  .trim()
  .min(7, "Phone number must be at least 7 digits")
  .max(20, "Phone number must be less than 20 characters")
  .regex(/^[\d\s\-+()]+$/, "Phone number can only contain digits, spaces, hyphens, plus sign, and parentheses");

const productSchema = z
  .string()
  .trim()
  .min(2, "Product name must be at least 2 characters")
  .max(100, "Product name must be less than 100 characters");

// Rate limiting constants
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const MAX_SUBMISSIONS_PER_WINDOW = 3;

// Sanitize input to prevent XSS and injection
const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .slice(0, 500); // Hard limit on input length
};

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
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submissionTimestamps = useRef<number[]>([]);
  const { toast } = useToast();

  const steps = [
    { field: "name", question: "Great! Could you please share your email address?", schema: nameSchema },
    { field: "email", question: "Thank you! What's your phone number?", schema: emailSchema },
    { field: "phone", question: "Which product are you interested in? (Moringa, Tomato Flakes, Spices, Rice, Others)", schema: phoneSchema },
    { field: "product", question: "Thank you for your enquiry! Our team will contact you shortly. Have a great day! 🌿", schema: productSchema },
  ];

  // Check rate limit
  const isRateLimited = (): boolean => {
    const now = Date.now();
    // Remove timestamps outside the window
    submissionTimestamps.current = submissionTimestamps.current.filter(
      (timestamp) => now - timestamp < RATE_LIMIT_WINDOW
    );
    return submissionTimestamps.current.length >= MAX_SUBMISSIONS_PER_WINDOW;
  };

  // Validate current field input
  const validateField = (fieldIndex: number, value: string): { success: boolean; error?: string } => {
    const schema = steps[fieldIndex]?.schema;
    if (!schema) return { success: true };

    const result = schema.safeParse(value);
    if (!result.success) {
      return { success: false, error: result.error.errors[0]?.message || "Invalid input" };
    }
    return { success: true };
  };

  const handleSend = async () => {
    if (!input.trim() || isSubmitting) return;

    const sanitizedInput = sanitizeInput(input);
    
    // Validate the current field
    const validation = validateField(step, sanitizedInput);
    if (!validation.success) {
      const errorMessage: Message = {
        id: messages.length + 1,
        text: `⚠️ ${validation.error} Please try again.`,
        isBot: true,
      };
      setMessages((prev) => [...prev, errorMessage]);
      setInput("");
      return;
    }

    const userMessage: Message = {
      id: messages.length + 1,
      text: sanitizedInput,
      isBot: false,
    };

    setMessages((prev) => [...prev, userMessage]);

    const updatedEnquiry = { ...enquiry };
    const fields: (keyof EnquiryData)[] = ["name", "email", "phone", "product"];
    if (step < fields.length) {
      updatedEnquiry[fields[step]] = sanitizedInput;
    }
    setEnquiry(updatedEnquiry);

    setInput("");

    setTimeout(async () => {
      if (step < steps.length) {
        if (step === steps.length - 1) {
          // Final step (product entered) - check rate limit and save enquiry
          if (isRateLimited()) {
            const rateLimitMessage: Message = {
              id: messages.length + 2,
              text: "⚠️ You've submitted too many enquiries recently. Please wait a moment before trying again.",
              isBot: true,
            };
            setMessages((prev) => [...prev, rateLimitMessage]);
            return;
          }

          setIsSubmitting(true);
          
          const { error } = await supabase.from("enquiries").insert({
            name: updatedEnquiry.name,
            email: updatedEnquiry.email,
            phone: updatedEnquiry.phone,
            product: updatedEnquiry.product,
          });

          setIsSubmitting(false);

          if (error) {
            const errorMessage: Message = {
              id: messages.length + 2,
              text: "Sorry, there was an error submitting your enquiry. Please try again later.",
              isBot: true,
            };
            setMessages((prev) => [...prev, errorMessage]);
            toast({
              title: "Error",
              description: "Failed to submit enquiry. Please try again.",
              variant: "destructive",
            });
            return;
          } else {
            // Record successful submission for rate limiting
            submissionTimestamps.current.push(Date.now());
            
            toast({
              title: "Enquiry Submitted!",
              description: "Thank you for reaching out. We'll get back to you soon.",
            });
          }
        }
        
        const botResponse: Message = {
          id: messages.length + 2,
          text: steps[step].question,
          isBot: true,
        };
        setMessages((prev) => [...prev, botResponse]);
        setStep((prev) => prev + 1);
      }
    }, 500);
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
