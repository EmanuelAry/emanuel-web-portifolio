import Image from 'next/image';
import { Rnd } from 'react-rnd';

import { ReactNode, useRef, useState } from 'react';
import figmaLogo from '../assets/icons/Applications/Figma-logo.svg'

import '../styles/global.css';

const initialSize = {
  height: 500,
  width: 600,
};

const intro = {
  name: 'Figma',
  desc: 'Agrupamento de projetos que realizei para terceiros ou para trabalhos na faculdade. Alguns participei apenas da prototipação outros pariticipei da prototipação e desenvolvimento.',
};

const figmaFiles = [
  {
    name: 'Wiki IPM',
    description:
      'Esse protótipo foi realizado o desenvolvimnto em PHP e está disponível em "https://wiki.ipm.com.br/". Trata-se de uma wiki de central de informações, reunindo artigos, publicações e dúvidas referêntes aos processos e produtos da empresa IPM Sistemas',
    url: 'https://www.figma.com/design/DijMBM0eTZJexKjoytNA4i/Wiki-IPM?t=oalANrAEiLXRwuOE-0',
    protoipy: 'https://www.figma.com/proto/DijMBM0eTZJexKjoytNA4i/Wiki-IPM?node-id=1-509&t=ETL3P5kUWnnbhsEA-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1'
  },
  {
    name: 'CIZAGUI - Sistema de Agendamento',
    description: 'Protótipo não implementado. O desenvolvimento desse protótipo foi para a disciplina de requisitos, onde foi realizado todos os processos de levantamento de requisitos e prototipação. A ferramenta Mobile, se propõe a facilitar o gerenciamento de atendimentos, para salões de estética ou clínicas no geral.',
    url: 'https://www.figma.com/design/qryXpliq7YgJEalsI9wcze/Cizagui?node-id=0-1&p=f&t=oalANrAEiLXRwuOE-0',
    protoipy: 'https://www.figma.com/proto/qryXpliq7YgJEalsI9wcze/Cizagui?node-id=1-2&p=f&t=FuimNsW4jcKueiSj-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=204%3A3'
  },
];

export default function FigmaModal({closeModal}:{closeModal: () => void;}){
  const [isDragging, setIsDragging] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const ref = useRef<Rnd>(null);

  function toggleSize() {
    if (isMaximized) {
      ref.current?.updateSize({
        height: initialSize.height,
        width: initialSize.width,
      });

      ref.current?.updatePosition({
        y: initialSize.height / 3,
        x: initialSize.width / 2,
      });
    } else {
      ref.current?.updateSize({
        height: parent.innerHeight - 22,
        width: parent.innerWidth,
      });

      ref.current?.updatePosition({
        y: 0 + 22,
        x: 0,
      });
    }

    setIsMaximized(!isMaximized);
  }

  return (
    <Rnd
      ref={ref}
      onDragStart={() => setIsDragging(true)}
      onDragStop={() => setIsDragging(false)}
      minHeight={500}
      minWidth={600}
      default={{
        y: initialSize.height / 4,
        x: initialSize.width / 0.5,
        height: initialSize.height,
        width: initialSize.width,
      }}
      className={`border border-[#262626] ${
        isDragging ? 'cursor-grabbing!' : 'cursor-grab!'
      } !active:cursor-grabbing`}
      bounds="parent"
      resizeHandleClasses={{
        top: '!cursor-rowResize',
        topLeft: '!cursor-nwseResize',
        topRight: '!cursor-neswResize',
        bottom: '!cursor-rowResize',
        bottomLeft: '!cursor-neswResize',
        bottomRight: '!cursor-nwseResize',
        left: '!cursor-colResize',
        right: '!cursor-colResize',
      }}
    >
      <div className="flex h-full flex-col border border-gray-400 bg-[#C0C4C8] p-1">
        {/* Title bar */}
        <div className="flex h-6 flex-row items-center justify-between bg-[#0000A8] gap-1 p-1">
          <div className="mx-1 flex flex-row items-center gap-1">
            <Image src={figmaLogo} alt="Figma logo" className="h-4 w-4" />
            <span className="text-base font-bold text-[#FFF] tracking-widest">Figma</span>
          </div>
          <div className='flex flex-row items-center gap-1'>
            <_Maximize onClick={toggleSize} />
            <_Close onClick={closeModal} />
          </div>
        </div>

        {/* Content */}
        <div className="mt-1 flex flex-1 cursor-default! flex-col gap-3 overflow-auto border-2 border-t-[#888] border-r-white border-b-white border-l-[#888] bg-white p-3">
          <div className="flex flex-row items-center gap-3">
            <Image
              src={figmaLogo}
              alt="Figma logo"
              width={80}
              height={80}
              className="h-20 w-20 "
              unoptimized
            />
            <div className="flex flex-col gap-1">
                {intro.name}
              <span className="text-base text-[#333]">{intro.desc}</span>
            </div>
          </div>

          <div className="h-px bg-[#999]" />

          <span className="text-base font-bold text-[#333]">
            Protótipos:
          </span>

          {/* Lista de Prototipos */}
          <div className="flex flex-col gap-2">
            {figmaFiles.map((repo) => (
              <div
                key={repo.name}
                className="flex flex-col gap-1 border border-[#ccc] bg-[#F5F5F5] p-2"
              >
                <div className="flex flex-row items-center justify-between">
                  <a
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base font-bold text-[#0000EE] underline hover:text-[#551A8B]"
                  >
                    {repo.name}
                  </a>
                </div>
                <span className="text-sm text-[#555]">{repo.description}</span>
                  <a
                    href={repo.protoipy}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base font-bold text-[#0000EE] underline hover:text-[#551A8B]"
                  >
                   <span className="text-xs" style={{ fontFamily: 'MS Sans Serif, Arial, sans-serif' }}>▶</span> Run Prototype
                  </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Rnd>
  );
}

function _Square({
  children,
  onClick,
}: {
  children?: ReactNode;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="h-4 w-4 cursor-pointer border border-t-white border-l-white border-b-[#808080] border-r-[#808080] bg-[#C0C0C0] flex items-center justify-center active:border-t-[#808080] active:border-l-[#808080] active:border-b-white active:border-r-white"
    >
      {children}
    </div>
  );
}

function _Close({ onClick }: { onClick?: () => void }) {
  return (
    <_Square onClick={onClick}>
      <div className="relative h-0.5 w-3">
        <div className="absolute h-0.5 w-full rotate-45 bg-black" />
        <div className="absolute h-0.5 w-full -rotate-45 bg-black" />
      </div>
    </_Square>
  );
}
function _Maximize({ onClick }: { onClick?: () => void }) {
  return (
    <_Square onClick={onClick}>
      <div className="relative  h-[0.65rem] w-[0.65rem] border-r-1 border-b-1 border-l-1 border-t-3 border-black" />
    </_Square>
  );
}
