'use client';

import Image, { StaticImageData } from 'next/image';
import { HTMLAttributes, ReactNode, useEffect, useRef, useState } from 'react';

import StartButton from './StartButton';
import calcIcon from '../assets/icons/Menu bar/Calculator.png';
import finderIcon from '../assets/icons/Menu bar/Finder.png';
import favoritesIcon from '../assets/icons/Menu bar/Favorites.png';
import recentAppsIcon from '../assets/icons/Menu bar/Recent applications.png';
import recentDocsIcon from '../assets/icons/Menu bar/Recent documents.png';
import sherlockIcon from '../assets/icons/Menu bar/Sherlock 2.0.png';
import keyCapsIcon from '../assets/icons/Menu bar/Key caps.png';
import scrapbookIcon from '../assets/icons/Menu bar/Scrapbook.png';
import stickiesIcon from '../assets/icons/Menu bar/Stickies.png';

type _ClassName = HTMLAttributes<HTMLDivElement>['className'];

type MenuItem =
  | {
      label: string;
      icon?: StaticImageData;
      shortcut?: string;
      disabled?: boolean;
      action?: () => void;
    }
  | 'separator';

export interface TaskBarProps {
  onOpenStartHub?: () => void;
  onCloseStartHub?: () => void;
  onOpenCalc?: ()     => void;
  onOpenPong?: ()     => void;
  onOpenGithub?: ()   => void;
}

export default function TaskBar({
  onOpenStartHub,
  onCloseStartHub,
  onOpenCalc,
  onOpenPong,
  onOpenGithub,
}: TaskBarProps) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false); // novo estado
  const navRef = useRef<HTMLElement>(null);


  // Handlers sincronizados
  const handleOpenStartMenu = () => {
    setIsStartMenuOpen(true);
    onOpenStartHub?.();
  };

  const handleCloseStartMenu = () => {
    setIsStartMenuOpen(false);
    onCloseStartHub?.();
  };

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
        if (isStartMenuOpen) handleCloseStartMenu(); 
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isStartMenuOpen, handleCloseStartMenu]);

  function toggleMenu(name: string) {
    setOpenMenu((prev) => (prev === name ? null : name));
  }

  function handleHover(name: string) {
    if (openMenu !== null) {
      setOpenMenu(name);
    }
  }

  function generatePassword(): string {
    const chars =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+[]{}|;:,.<>?';
    const array = new Uint32Array(20);
    crypto.getRandomValues(array);
    return Array.from(array, (v) => chars[v % chars.length]).join('');
  }
  
  function closeMenu() {
    setOpenMenu(null);
  }

  function handleCopyPassword() {
    const pw = generatePassword();
    navigator.clipboard.writeText(pw);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    closeMenu();
  }

  const utilitiesMenuItems: MenuItem[] = [
    {
      label: 'Calculator',
      icon: calcIcon,
      action: () => {
        onOpenCalc?.();
        closeMenu();
      },
    },
    {
      label: 'Pong',
      icon: keyCapsIcon,
      action: () => {
        onOpenPong?.();
        closeMenu();
      },
    },
    {
      label: 'GitHub',
      icon: finderIcon,
      action: () => {
        onOpenGithub?.();
        closeMenu();
      },
    },
    'separator',
    {
      label: copied ? 'Copied!' : 'Random Password',
      icon: sherlockIcon,
      action: handleCopyPassword,
    },
  ];

  const aboutMenuItems: MenuItem[] = [
    {
      label: 'Developer: Emanuel Ary',
      icon: stickiesIcon,
      action: () => {
        window.open('https://github.com/EmanuelAry', '_blank');
        closeMenu();
      },
    },
    'separator',
    {
      label: 'LinkedIn',
      icon: favoritesIcon,
      action: () => {
        window.open('https://www.linkedin.com/in/emanuel-oliveira-4010841a2/', '_blank');
        closeMenu();
      },
    },
    {
      label: 'Source Code on GitHub',
      icon: scrapbookIcon,
      action: () => {
        window.open('https://github.com/HenriqueNas/HenriqueNas-web', '_blank');
        closeMenu();
      },
    },
    'separator',
    { label: 'Built with Next.js', disabled: true },
    { label: 'Version 0.2.0', disabled: true },
  ];

  const viewMenuItems: MenuItem[] = [
    { label: 'Show Icons', icon: recentAppsIcon },
    { label: 'Show Grid', icon: recentDocsIcon, disabled: true },
    'separator',
    { label: 'Zoom In', shortcut: '⌘+', disabled: true },
    { label: 'Zoom Out', shortcut: '⌘-', disabled: true },
    { label: 'Actual Size', shortcut: '⌘0', disabled: true },
    'separator',
    { label: 'Show Toolbar', shortcut: '⌘T', disabled: true },
    { label: 'Hide Status Bar', disabled: true },
  ];

  return (
    <nav
      ref={navRef}
      className="relative z-50 flex h-10 w-full items-center border-t border-b-2 border-black border-t-white bg-[#ddd] before:border-b-2 before:border-white"
    >
      <StartButton onClick={() => { 
          if(isStartMenuOpen){
            handleCloseStartMenu();
          }else{
            handleOpenStartMenu();
          }
          closeMenu(); 
        }
      } />
      <_TaskBarDropdown
        label="Utilities"
        items={utilitiesMenuItems}
        isOpen={openMenu === 'utilities'}
        onClick={() => toggleMenu('utilities')}
        onHover={() => handleHover('utilities')}
      />
      <_TaskBarDropdown
        label="About"
        items={aboutMenuItems}
        isOpen={openMenu === 'about'}
        onClick={() => toggleMenu('about')}
        onHover={() => handleHover('about')}
      />
      <_TaskBarDropdown
        label="View"
        items={viewMenuItems}
        isOpen={openMenu === 'view'}
        onClick={() => toggleMenu('view')}
        onHover={() => handleHover('view')}
      />
      <TaskBarClock />
    </nav>
  );
}

function _TaskBarDropdown({
  label,
  items,
  isOpen,
  onClick,
  onHover,
}: {
  label: string;
  items: MenuItem[];
  isOpen: boolean;
  onClick: () => void;
  onHover: () => void;
}) {
  return (
    <div className="relative" onMouseEnter={onHover}>
      <div
        onClick={onClick}
        className={`flex h-6 cursor-pointer items-center justify-center px-2 select-none ${isOpen ? 'bg-[#333399] text-white' : 'hover:bg-[#0000A8] hover:text-white'} `}
      >
        {label}
      </div>
      {isOpen && (
        <div className="absolute bottom-full left-0 min-w-50 border border-t-white border-r-[#555] border-b-[#555] border-l-white bg-[#CCCCCC] py-0.5 shadow-[2px_2px_0px_#555]">
          {items.map((item, i) =>
            item === 'separator' ? (
              <div
                key={`sep-${i}`}
                className="mx-1 my-0.5 border-t border-b border-t-[#888] border-b-white"
              />
            ) : (
              <div
                key={item.label}
                onClick={!item.disabled ? item.action : undefined}
                className={`flex items-center justify-between gap-4 px-4 py-0.5 ${
                  item.disabled
                    ? 'cursor-default text-[#888]'
                    : 'cursor-default hover:bg-[#333399] hover:text-white'
                } `}
              >
                <span className="flex items-center gap-2">
                  {item.icon && (
                    <Image
                      src={item.icon}
                      alt=""
                      width={16}
                      height={16}
                      className="inline-block"
                    />
                  )}
                  {item.label}
                </span>
                {item.shortcut && (
                  <span className="text-[0.75em] opacity-70">
                    {item.shortcut}
                  </span>
                )}
              </div>
            ),
          )}
        </div>
      )}
    </div>
  );
}

function TaskBarClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 60000); // atualiza a cada minuto
    return () => clearInterval(interval);
  }, []);

  const hours = time.getHours().toString().padStart(2, '0');
  const minutes = time.getMinutes().toString().padStart(2, '0');

  return (
    <div className="ml-auto mr-2 flex h-6 items-center justify-center border-2 border-t-[#808080] border-l-[#808080] border-b-white border-r-white bg-[#ddd] px-2 select-none">
      {hours}:{minutes}
    </div>
  );
}