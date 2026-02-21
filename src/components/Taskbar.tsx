'use client';

import Image, { StaticImageData } from 'next/image';
import { HTMLAttributes, ReactNode, useEffect, useRef, useState } from 'react';

import StartButton from './StartButton';
import calcIcon from '../assets/icons/Menu bar/Calculator.png';
import pongIcon from '../assets/icons/Applications/pong.png';
import tetrisIcon from '../assets/shortcuts/tetris.png';
import github from '../assets/shortcuts/github.png';
import figmaico from '../assets/shortcuts/figma.png';
import projects from '../assets/shortcuts/directory_admin_tools.png';

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
  startMenuOpen: boolean;
  isOpenCalc: boolean;
  isOpenPong: boolean;
  isOpenGithub: boolean;
  isOpenFigma: boolean;
  isOpenProject: boolean;
  isOpenTetris: boolean;
  onOpenStartMenu?: () => void;
  onCloseStartMenu?: () => void;
  onCloseCalc?: () => void;
  onClosePong?: () => void;
  onCloseGitHub?: () => void;
  onCloseFigma?: () => void;
  onCloseProject?:() => void;
  onCloseTetris?:() => void;
}

export default function TaskBar({
  startMenuOpen,
  isOpenCalc,
  isOpenPong,
  isOpenGithub,
  isOpenFigma,
  isOpenProject,
  isOpenTetris,
  onOpenStartMenu,
  onCloseStartMenu,
  onCloseCalc,
  onClosePong,
  onCloseGitHub,
  onCloseFigma,
  onCloseProject,
  onCloseTetris,
}: TaskBarProps) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(startMenuOpen); // novo estado
  const navRef = useRef<HTMLElement>(null);


  // Handlers sincronizados
  const handleOpenStartMenu = () => {
    setIsStartMenuOpen(true);
    onOpenStartMenu?.();
  };

  const handleCloseStartMenu = () => {
    setIsStartMenuOpen(false);
    onCloseStartMenu?.();
  };

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

  return (
    <nav
      ref={navRef}
      className="relative z-1 flex h-10 w-full items-center border-t border-b-2 border-black border-t-white bg-[#ddd] before:border-b-2 before:border-white"
    >
      <StartButton onClick={() => { 
          if(startMenuOpen){
            handleCloseStartMenu();
          }else{
            handleOpenStartMenu();
          }
          closeMenu(); 
        }
      } />
      {isOpenCalc &&(
        <_TaskBarItens
          label="Calculadora"
          icon={calcIcon}
          onClick={() => onCloseCalc?.()}
        />
      )}
      {isOpenPong && (
        <_TaskBarItens
          label="Pong"
          icon={pongIcon}
          onClick={() => onClosePong?.()}
        />
      )}
      {isOpenTetris && (
        <_TaskBarItens
          label="Tetris"
          icon={tetrisIcon}
          onClick={() => onCloseTetris?.()}
        />
      )}
      {isOpenGithub && (
        <_TaskBarItens
          label="GitHub"
          icon={github}
          onClick={() => onCloseGitHub?.()}
        />
      )}
      {isOpenFigma && (
        <_TaskBarItens
          label="Figma"
          icon={figmaico}
          onClick={() => onCloseFigma?.()}
        />
      )}
      {isOpenProject && (
        <_TaskBarItens
          label="Projects"
          icon={projects}
          onClick={() => onCloseProject?.()}
        />
      )}
      
      <TaskBarClock />
    </nav>
  );
}

function _TaskBarItens({
  label,
  icon,
  onClick,
}: {
  label: string;
  icon: StaticImageData;
  onClick: () => void;
}) {
  const [isPressed, setIsPressed] = useState(false);
  return (
    <button
      id='startButton'
      onClick={onClick}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      className={`
        flex items-center gap-2 h-8 px-2 ml-1
        bg-[#c0c0c0]
        border-2
        ${isPressed 
          ? 'border-t-[#808080] border-l-[#808080] border-b-white border-r-white' 
          : 'border-t-white border-l-white border-b-[#808080] border-r-[#808080]'
        }
        active:border-t-[#808080] active:border-l-[#808080] active:border-b-white active:border-r-white
        select-none
      `}
    >
      <Image id='imgStartButton' src={icon} alt="" width={25} height={25} />
      {label}
    </button>
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