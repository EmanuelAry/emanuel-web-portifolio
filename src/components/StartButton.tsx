'use client';

import Image from 'next/image';
import { useState } from 'react';
import win95Logo from '../assets/icons/Menu bar/Win95 logo.png';

interface StartButtonProps {
  onClick?: () => void;
}

export default function StartButton({ onClick }: StartButtonProps) {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      className={`
        flex items-center gap-1 h-8 px-2 ml-1
        bg-[#c0c0c0]
        border-2
        ${isPressed 
          ? 'border-t-[#808080] border-l-[#808080] border-b-white border-r-white' 
          : 'border-t-white border-l-white border-b-[#808080] border-r-[#808080]'
        }
        active:border-t-[#808080] active:border-l-[#808080] active:border-b-white active:border-r-white
        font-bold select-none
      `}
    >
      <Image src={win95Logo} alt="" width={20} height={20} />
      Start
    </button>
  );
}