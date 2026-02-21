'use client';
import Image, { StaticImageData } from 'next/image';
import { Rnd } from 'react-rnd';
import { HTMLAttributes, ReactNode, useRef, useState, useEffect } from 'react';
import { w95bold } from '@/styles/fonts/w95bold';



import calcIcon from '../assets/icons/Menu bar/Calculator.png';
import programsIcon from '../assets/icons/Menu bar/programs.png';
import documentsIcon from '../assets/icons/Menu bar/documents.png';
import settingsIcon from '../assets/icons/Menu bar/settings.png';
import findIcon from '../assets/icons/Menu bar/search.png';
import helpIcon from '../assets/icons/Menu bar/help_book.png';
import runIcon from '../assets/icons/Menu bar/app-hourglass.png';
import shutIcon from '../assets/icons/Menu bar/shut_down.png';
import linkedinIcon from '../assets/shortcuts/linkedin.png';
import recentAppsIcon from '../assets/icons/Menu bar/Recent applications.png';
import recentDocsIcon from '../assets/icons/Menu bar/Recent documents.png';
import sherlockIcon from '../assets/icons/Menu bar/Sherlock 2.0.png';
import pongIcon from '../assets/icons/Applications/pong.png';
import github from '../assets/shortcuts/github.png';
import resumeIcon from '../assets/icons/Menu bar/resume.png';

type _ClassName = HTMLAttributes<HTMLDivElement>['className'];

import '../styles/global.css';

type MenuItem =
  | {
      label: string;
      icon?: StaticImageData;
      shortcut?: string;
      disabled?: boolean;
      action?: () => void;
    }
  | 'separator';
export interface StartMenuProps {
  startMenuOpen: boolean
  onCloseStartMenu?: () => void;
  onOpenCalc?: ()     => void;
  onOpenPong?: ()     => void;
  onOpenGithub?: ()   => void;
  closeModal: ()      => void;
}
export default function StartMenuModal({
  startMenuOpen,
  onCloseStartMenu,
  closeModal,
  onOpenCalc,
  onOpenPong,
  onOpenGithub
}: StartMenuProps) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(startMenuOpen);
  const menuRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  // Fecha o menu ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      let idElementTarget = (event.target as HTMLElement).id;
      // Verifica se está clicando no elemento atual ou no botão start, caso esteja não deve fechar aqui( no caso de clicar no botão o tratamento é feito na Taskbar.tsx)
      if (menuRef.current && !menuRef.current.contains(event.target as Node) && idElementTarget !== "startButton" && idElementTarget !== "imgStartButton") {
        setIsStartMenuOpen(false);
        onCloseStartMenu?.();
        closeModal();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setIsStartMenuOpen, closeModal]);
  
  function toggleMenu(name: string) {
    console.log(name);
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

  const programsMenuItems: MenuItem[] = [
    {
      label: 'Calculator',
      icon: calcIcon,
      action: () => {
        onOpenCalc?.();
      },
    },
    {
      label: 'Pong',
      icon: pongIcon,
      action: () => {
        onOpenPong?.();
      },
    },
    {
      label: 'GitHub',
      icon: github,
      action: () => {
        onOpenGithub?.();
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
      icon: resumeIcon,
      action: () => {
        window.open('https://github.com/EmanuelAry', '_blank');
        closeMenu();
      },
    },
    'separator',
    {
      label: 'LinkedIn',
      icon: linkedinIcon,
      action: () => {
        window.open('https://www.linkedin.com/in/emanuel-oliveira-4010841a2/', '_blank');
        closeMenu();
      },
    },
    {
      label: 'Source Code on GitHub',
      icon: github,
      action: () => {
        window.open('https://github.com/EmanuelAry/emanuel-web-portifolio', '_blank');
        closeMenu();
      },
    },
    'separator',
    { label: 'Built with Next.js', disabled: true },
    { label: 'Version 0.2.0', disabled: true },
  ];
  const settingsMenuItems: MenuItem[] = [
    { label: 'Show Icons', icon: recentAppsIcon, disabled: true },
    { label: 'Show Grid', icon: recentDocsIcon, disabled: true },
    'separator',
    { label: 'Zoom In', shortcut: '⌘+', disabled: true },
    { label: 'Zoom Out', shortcut: '⌘-', disabled: true },
    { label: 'Actual Size', shortcut: '⌘0', disabled: true },
    'separator',
    { label: 'Show Toolbar', shortcut: '⌘T', disabled: true },
    { label: 'Hide Status Bar', disabled: true },
  ];
  const findMenuItems: MenuItem[] = [];
  const helpMenuItems: MenuItem[] = [];
  const runMenuItems: MenuItem[] = [];

  return (
    <div
      ref={menuRef}
      className="absolute bottom-0 left-0 z-60 flex w-64 border-2 bg-[#C0C4C8] border-t-white border-l-white border-b-[#808080] border-r-[#808080] shadow-lg"
      style={{ imageRendering: 'pixelated' }} 
    >
      {/* Faixa lateral com o logo "Windows 95" */}
      <div className="w-8 bg-[#84888C] flex items-center justify-center">
        <span
          className="text-xs select-none"
          style={{
            writingMode: 'vertical-rl',
            transform: 'rotate(180deg)',
            fontSize: '30px',
            color: 'white',
            fontWeight: 'lighter',
          }}
        >
          <b
            className={`${w95bold.className}`}
            style={{
            color: '#C0C4C8',
          }}>Windows</b> 95
        </span>
      </div>
      <div className="ml-1 flex flex-col">
        <ItensMenuDropSide
          label="Programs"
          icon={programsIcon}
          items={programsMenuItems}
          hasSubmenu={true}
          active={true}
          isOpen={openMenu === 'programs'}
          onClick={() => toggleMenu('programs')}
          onHover={() => handleHover('programs')}
        />
        
        <ItensMenuDropSide
          label="About"
          icon={documentsIcon}
          items={aboutMenuItems}
          hasSubmenu={true}
          active={true}
          isOpen={openMenu === 'about'}
          onClick={() => toggleMenu('about')}
          onHover={() => handleHover('about')}
        />
        
        <ItensMenuDropSide
          label="Settings"
          icon={settingsIcon}
          items={settingsMenuItems}
          hasSubmenu={true}
          active={true}
          isOpen={openMenu === 'settings'}
          onClick={() => toggleMenu('settings')}
          onHover={() => handleHover('settings')}
        />
        
        <ItensMenuDropSide
          label="Find"
          icon={findIcon}
          items={[]}
          hasSubmenu={false}
          active={false}
          isOpen={false}
          onClick={() => null}
          onHover={() => null}
        />
        
        <ItensMenuDropSide
          label="Help"
          icon={helpIcon}
          items={[]}
          hasSubmenu={false}
          active={false}
          isOpen={false}
          onClick={() => null}
          onHover={() => null}
        />
        
        <ItensMenuDropSide
          label="Run.."
          icon={runIcon}
          items={[]}
          hasSubmenu={false}
          active={false}
          isOpen={false}
          onClick={() => null}
          onHover={() => null}
        />
        <div
          className="mx-1 my-0.5 border-t border-b border-t-[#888] border-b-white"
        />
        <ItensMenuDropSide
          label="Shut Down.."
          icon={shutIcon}
          items={[]}
          hasSubmenu={false}
          active={false}
          isOpen={false}
          onClick={() => null}
          onHover={() => null}
        />
      </div>    
    </div>
  );
}
function ItensMenuDropSide({
  label,
  icon,
  items,
  hasSubmenu,
  active,
  isOpen,
  onClick,
  onHover,
}: {
  label: string;
  icon: StaticImageData; 
  items: MenuItem[];
  hasSubmenu: boolean;
  active: boolean;
  isOpen: boolean;
  onClick: () => void;
  onHover: () => void;
}) {
  return (
    // <div className="flex-1 py-1">
    <div className="relative w-full">
      <div
        key={label}
        onClick={onClick}
        className={`flex items-center gap-2 justify-between px-4 py-1 cursor-default ${isOpen ? 'bg-[#333399] text-white' : 'hover:bg-[#000080] hover:text-white'}`}
      >
        <div className='flex items-center gap-2'>
          <Image src={icon} alt="" width={50} height={50} className="inline-block"/>
          <span>{label}</span>
        </div>
        {hasSubmenu ? (
          <span className="text-xs" style={{ fontFamily: 'MS Sans Serif, Arial, sans-serif' }}>
          ▶
          </span>
        ) : (
          <span className="text-xs" style={{ fontFamily: 'MS Sans Serif, Arial, sans-serif' }}>
          </span>  
        )}
      </div>
      {isOpen && active && (
        // <div className="absolute left-0 min-w-50 border border-t-white border-r-[#555] border-b-[#555] border-l-white bg-[#C0C4C8] py-0.5 shadow-[2px_2px_0px_#555]">
        <div className="absolute z-70 left-full bottom-0 min-w-48 border border-t-white border-r-[#555] border-b-[#555] border-l-white bg-[#C0C4C8] py-0.5 shadow-[2px_2px_0px_#555]">
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