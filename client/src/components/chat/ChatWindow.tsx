import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { ChatMessage } from './ChatMessage';
import { QuickOptions } from './QuickOptions';

interface ChatWindowProps {
  onClose: () => void;
  isOpen: boolean;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ onClose, isOpen }) => {
  const [isTyping, setIsTyping] = useState(true);
  const [showMessage, setShowMessage] = useState(false);
  const chatContentRef = useRef<HTMLDivElement>(null);
  const path = window.location.pathname;
  const isHomePage = path === '/';
  const isMalviyaNagarPage = path === '/locations/malviya-nagar';

  useEffect(() => {
    if (isOpen) {
      setIsTyping(true);
      setShowMessage(false);
      chatContentRef.current?.scrollTo({ top: 0, behavior: 'auto' });

      const timer = setTimeout(() => {
        setIsTyping(false);
        setShowMessage(true);
      }, 700);

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      chatContentRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [isOpen, isTyping, showMessage]);

  const handleDayPassClick = () => {
    window.open(
      "https://wa.me/916366460968?text=Hi%20I'm%20interested%20in%20the%20Day%20Pass%20at%20Distinct%20Co-Working",
      '_blank',
      'noopener,noreferrer'
    );
  };

  const welcomeMessage = isMalviyaNagarPage ? (
    <>
      Hi {'\uD83D\uDC4B'} <br />
      Interested in our Malviya Nagar workspace? <br />
      How can I help you today?
    </>
  ) : (
    <>
      Hi {'\uD83D\uDC4B'} <br />
      {isHomePage ? 'Welcome to Distinct Co-Working.' : 'Welcome to Distinct Co-Working.'} <br />
      How can I help you today?
    </>
  );

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 left-4 sm:left-auto sm:bottom-6 sm:right-6 z-50 sm:w-80 max-w-[calc(100vw-2rem)] bg-background border border-border rounded-lg shadow-2xl transition-all duration-300 ease-in-out">
      <div className="flex flex-col p-4 border-b border-border bg-secondary">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-foreground">Distinct Concierge</h3>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
            aria-label="Close chat"
          >
            <X className="w-4 h-4" strokeWidth={2} />
          </button>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          Usually replies within a few minutes
        </p>
      </div>

      <div ref={chatContentRef} className="h-[26rem] sm:h-96 overflow-y-auto p-4 space-y-4">
        {isTyping && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
              <span className="text-primary-foreground text-sm font-bold">D</span>
            </div>
            <div className="bg-muted rounded-lg p-3 max-w-[80%]">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
              <p className="text-xs text-muted-foreground mt-1">Assistant is typing...</p>
            </div>
          </div>
        )}

        {showMessage && (
          <ChatMessage
            message={welcomeMessage}
            isAssistant={true}
            timestamp={new Date()}
          />
        )}

        {showMessage && (
          <div className="rounded-lg border border-primary/20 bg-primary/5 p-3">
            <p className="text-sm font-semibold text-foreground">{'\uD83D\uDD25'} Day Pass Available</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Work for a full day at Distinct Co-Working.
            </p>
            <p className="mt-2 text-sm font-semibold text-foreground">
              Starting at Only {'\u20B9'}500/- 
            </p>
            <button
              onClick={handleDayPassClick}
              className="mt-3 w-full rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              Book Day Pass
            </button>
          </div>
        )}

        {showMessage && (
          <div className="mt-4">
            <QuickOptions />
          </div>
        )}
      </div>

      <div className="p-4 border-t border-border bg-secondary">
        <div className="text-center text-muted-foreground text-xs">
          Powered by Distinct Co-Working
        </div>
      </div>
    </div>
  );
};
