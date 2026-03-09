import React, { useState, useEffect } from 'react';
import { ChatBubble } from './ChatBubble';
import { ChatWindow } from './ChatWindow';

export interface ChatMessage {
  id: string;
  text: string;
  isAssistant: boolean;
  timestamp: Date;
}

export const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  // Handle ESC key to close chat
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  // Prevent body scroll when chat is open on mobile
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Track analytics for future implementation
  useEffect(() => {
    if (isOpen) {
      // Future: Analytics tracking - chat opened
      console.log('Chat widget opened');
    }
  }, [isOpen]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const closeChat = () => {
    setIsOpen(false);
  };

  const addMessage = (text: string, isAssistant: boolean = false) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      text,
      isAssistant,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  return (
    <>
      {/* Chat Bubble - shown when chat is closed */}
      <ChatBubble onClick={toggleChat} isOpen={isOpen} />
      
      {/* Chat Window - shown when chat is open */}
      <ChatWindow onClose={closeChat} isOpen={isOpen} />
    </>
  );
};
