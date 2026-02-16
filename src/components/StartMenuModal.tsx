import Image, { StaticImageData } from 'next/image';
import { Rnd } from 'react-rnd';
import { ReactNode, useRef, useState, useEffect } from 'react';
import { w95bold } from '@/styles/fonts/w95bold';

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

function generatePassword(): string {
  const chars =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+[]{}|;:,.<>?';
  const array = new Uint32Array(20);
  crypto.getRandomValues(array);
  return Array.from(array, (v) => chars[v % chars.length]).join('');
}

function toggleMenu(name: string) {
  setOpenMenu((prev) => (prev === name ? null : name));
}


export interface StartMenuProps {

  
  isOpen: boolean;
  closeModal: () => void;
  // Callbacks para cada item (opcionais, para futuras funcionalidades)
  onPrograms?: () => void;
  onDocuments?: () => void;
  onSettings?: () => void;
  onFind?: () => void;
  onHelp?: () => void;
  onRun?: () => void;
  onShutDown?: () => void;
}

export default function StartMenuModal({
  isOpen,
  closeModal,
  onPrograms,
  onDocuments,
  onSettings,
  onFind,
  onHelp,
  onRun,
  onShutDown,
}: StartMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  // Fecha o menu ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        closeModal();
      }
    }
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, closeModal]);

  if (!isOpen) return null;



  //EMANUEL VERIFICAR AQUI
  const menuItems = [
    { label: 'Programs', action: onPrograms, hasSubmenu: true },
    { label: 'Documents', action: onDocuments, hasSubmenu: true },
    { label: 'Settings', action: onSettings, hasSubmenu: true },
    { label: 'Find', action: onFind, hasSubmenu: true },
    { label: 'Help', action: onHelp, hasSubmenu: false },
    { label: 'Run...', action: onRun, hasSubmenu: false },
    { label: 'Shut Down...', action: onShutDown, hasSubmenu: false },
  ];

  return (
    <div
      ref={menuRef}
      className="absolute bottom-0 left-0 z-50 flex w-64 border-2 bg-[#C0C4C8] border-t-white border-l-white border-b-[#808080] border-r-[#808080] shadow-lg"
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

      {/* Lista de itens do menu */}
      <div className="flex-1 py-1">
        {menuItems.map((item) => (
          <div
            key={item.label}
            onClick={() => {
              item.action?.();
              closeModal(); // Fecha o menu após a ação (opcional, pode ser removido se quiser manter aberto)
            }}
            className="flex items-center justify-between px-4 py-1 cursor-default hover:bg-[#000080] hover:text-white"
          >
            <span>{item.label}</span>
            {item.hasSubmenu && (
              <span className="text-xs" style={{ fontFamily: 'MS Sans Serif, Arial, sans-serif' }}>
                ▶
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}