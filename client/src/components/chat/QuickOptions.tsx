import React from 'react';

interface QuickOption {
  id: string;
  label: string;
  message: string;
}

const quickOptions: QuickOption[] = [
  {
    id: 'private-cabins',
    label: '\uD83C\uDFE2 Private cabins',
    message: 'Hi, I\'m interested in private cabins at Distinct Co-Working.',
  },
  {
    id: 'hot-desk',
    label: '\uD83D\uDCBB Hot / Open desk',
    message: 'Hi, I\'m interested in the hot/open desk workspace.',
  },
  {
    id: 'conference-rooms',
    label: '\uD83C\uDFA4 Conference Rooms',
    message: 'Hi, I\'d like to check conference room availability.',
  },
  {
    id: 'pricing',
    label: '\uD83D\uDCB0 Pricing & availability',
    message: 'Hi, could you share pricing and availability details?',
  },
  {
    id: 'tour',
    label: '\uD83D\uDCC5 Schedule a tour',
    message: 'Hi, I\'d like to schedule a tour of the Malviya Nagar workspace.',
  },
];

export const QuickOptions: React.FC = () => {
  const handleOptionClick = (message: string) => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/916366460968?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="space-y-3">
      <p className="text-xs text-muted-foreground font-medium">
        Choose an option to get started:
      </p>
      <div className="grid grid-cols-1 gap-2">
        {quickOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => handleOptionClick(option.message)}
            className="
              flex items-center w-full
              p-3 text-left
              bg-muted hover:bg-muted/80
              border border-border hover:border-primary/50
              rounded-lg shadow-sm hover:shadow-md
              transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-primary/50
              group
            "
          >
            <span className="text-sm text-foreground group-hover:text-primary transition-colors">
              {option.label}
            </span>
          </button>
        ))}
      </div>

      <div className="mt-4 pt-3 border-t border-border">
        <p className="text-xs text-muted-foreground text-center">
          Clicking any option will open WhatsApp to continue the conversation
        </p>
      </div>
    </div>
  );
};
