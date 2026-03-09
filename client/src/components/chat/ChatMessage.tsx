import React from 'react';

interface ChatMessageProps {
  message: React.ReactNode;
  isAssistant?: boolean;
  timestamp?: Date;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ 
  message, 
  isAssistant = true,
  timestamp 
}) => {
  return (
    <div className={`flex items-start gap-3 ${isAssistant ? '' : 'flex-row-reverse'}`}>
      {isAssistant && (
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
          <span className="text-primary-foreground text-sm font-bold">D</span>
        </div>
      )}
      
      <div className={`
        max-w-[80%] rounded-lg p-3
        ${isAssistant 
          ? 'bg-muted text-muted-foreground' 
          : 'bg-primary text-primary-foreground'
        }
      `}>
        <p className="text-sm leading-relaxed">
          {message}
        </p>
        {timestamp && (
          <p className="text-xs opacity-60 mt-1">
            {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        )}
      </div>
    </div>
  );
};
