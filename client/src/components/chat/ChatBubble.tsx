import React, { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';

interface ChatBubbleProps {
  onClick: () => void;
  isOpen: boolean;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({ onClick, isOpen }) => {
  const [bubbleText, setBubbleText] = useState("Need help?");

  useEffect(() => {
    const timer = setTimeout(() => {
      setBubbleText("Need help choosing a workspace?");
    }, 7000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <button
      onClick={onClick}
      className={`
        fixed bottom-6 right-6 z-50
        flex items-center gap-3
        px-5 py-3
        bg-primary text-primary-foreground
        rounded-full shadow-lg
        transition-all duration-300 ease-in-out
        hover:scale-105 hover:shadow-xl
        hover:bg-primary/90
        focus:outline-none focus:ring-2 focus:ring-primary/50
        ${isOpen ? 'scale-0 opacity-0 pointer-events-none' : 'scale-100 opacity-100'}
      `}
      aria-label="Open chat assistant"
      aria-expanded={isOpen}
    >
      <MessageCircle className="w-5 h-5" strokeWidth={2} />
      <span className="text-sm font-medium">{bubbleText}</span>
    </button>
  );
};
