import React from 'react';

interface LoganLogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'gold' | 'white' | 'full';
}

export const LoganLogo: React.FC<LoganLogoProps> = ({
  className = '',
  showText = true,
  size = 'md',
  variant = 'gold',
}) => {
  const sizeMap = {
    sm: { icon: 32, text: 'text-base', sub: 'text-[9px]' },
    md: { icon: 42, text: 'text-xl', sub: 'text-[10px]' },
    lg: { icon: 56, text: 'text-2xl', sub: 'text-xs' },
    xl: { icon: 84, text: 'text-4xl', sub: 'text-sm' },
  };

  const { icon: iconSize, text: textSize, sub: subSize } = sizeMap[size];

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {/* Authentic Vector Icon matching Image 1 */}
      <div 
        style={{ width: iconSize, height: iconSize }} 
        className="relative flex-shrink-0 flex items-center justify-center p-0.5 rounded-lg bg-[#14171F]/80 border border-[#D4AF37]/30 shadow-inner"
      >
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-sm"
        >
          {/* Comb Top Section */}
          <path
            d="M 22 28 C 22 23 28 20 50 20 C 72 20 78 23 78 28 L 78 35 C 78 35.5 77.5 36 77 36 L 23 36 C 22.5 36 22 35.5 22 35 Z"
            fill="#D4AF37"
          />
          {/* Comb Teeth */}
          <rect x="25" y="27" width="2.5" height="12" rx="1.2" fill="#D4AF37" />
          <rect x="30" y="27" width="2.5" height="12" rx="1.2" fill="#D4AF37" />
          <rect x="35" y="27" width="2.5" height="12" rx="1.2" fill="#D4AF37" />
          <rect x="40" y="27" width="2.5" height="12" rx="1.2" fill="#D4AF37" />
          <rect x="45" y="27" width="2.5" height="12" rx="1.2" fill="#D4AF37" />
          <rect x="50" y="27" width="2.5" height="12" rx="1.2" fill="#D4AF37" />
          <rect x="55" y="27" width="2.5" height="12" rx="1.2" fill="#D4AF37" />
          <rect x="60" y="27" width="2.5" height="12" rx="1.2" fill="#D4AF37" />
          <rect x="65" y="27" width="2.5" height="12" rx="1.2" fill="#D4AF37" />
          <rect x="70" y="27" width="2.5" height="12" rx="1.2" fill="#D4AF37" />

          {/* Shield Outline Frame */}
          <path
            d="M 23 42 L 23 58 L 50 78 L 77 58 L 77 42 L 72 42 L 72 56 L 50 73 L 28 56 L 28 42 Z"
            fill="#1E232D"
          />

          {/* Beard and Mustache Gold Volume */}
          <path
            d="M 27 45 L 34 58 L 44 48 L 50 51 L 56 48 L 66 58 L 73 45 L 73 57 L 50 74 L 27 57 Z"
            fill="#D4AF37"
          />
          {/* Mustache Shadow & Highlights */}
          <path
            d="M 36 50 Q 50 44 64 50 Q 50 58 36 50 Z"
            fill="#B88A1E"
          />
          {/* Mouth Opening */}
          <path
            d="M 44 54 L 56 54 L 53 58 L 47 58 Z"
            fill="#0E1015"
          />
          {/* Chin center shadow split for 3D effect */}
          <path
            d="M 50 51 L 50 74 L 50 58 Z"
            stroke="#946C10"
            strokeWidth="1.5"
          />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col leading-none select-none">
          <span 
            className={`font-brand font-bold tracking-[0.2em] uppercase ${textSize} ${
              variant === 'gold' 
                ? 'text-[#E5B84B]' 
                : variant === 'white' 
                ? 'text-white' 
                : 'text-[#E5B84B]'
            }`}
          >
            LOGAN
          </span>
          <span className={`font-sans uppercase tracking-[0.28em] font-semibold text-[#8E95A5] ${subSize} mt-0.5`}>
            BARBERSHOP
          </span>
        </div>
      )}
    </div>
  );
};
