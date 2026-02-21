import Image from 'next/image';
import { Rnd } from 'react-rnd';

import { ReactNode, useRef, useState } from 'react';
import projects from '../assets/shortcuts/directory_admin_tools.png';
import catworking from '../assets/icons/Applications/200w.gif'

import '../styles/global.css';

const initialSize = {
  height: 500,
  width: 800,
};

export default function ProjectsModal({
  closeModal,
}: {
  closeModal: () => void;
}) {
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
      minWidth={800}
      default={{
        y: initialSize.height / 3,
        x: initialSize.width / 2,
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
      <div className="h-full border border-gray-400 bg-[#C0C4C8] p-1">
        {/* Title bar */}
        <div className="flex h-6 flex-row items-center justify-between bg-[#0000A8] gap-1 p-1 mb-2">
          <div className="mx-1 flex flex-row items-center gap-1 ">
            <Image
              src={projects}
              alt={`Folder with projects logo`}
              className="h-5 w-5"
            />
            <span className="text-base font-bold text-[#FFF] tracking-widest">Projects</span>
          </div>
          <div className='flex flex-row items-center gap-1'>
            <_Maximize onClick={toggleSize} />
            <_Close onClick={closeModal} />
          </div>
        </div>
        {/* Content */}
        <div className="mt-1 flex flex-1 cursor-default! flex-col gap-3 border-2 border-t-[#888] border-r-white border-b-white border-l-[#888] bg-white p-3 items-center h-9/10">
          <br />
          <Image
            src={catworking}
            alt={`Folder with projects logo`}
            className="h-50"
          />
          <span>Working in new projects</span>
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

function _Maximize({ onClick }: { onClick?: () => void }) {
  return (
    <_Square onClick={onClick}>
      <div className="relative  h-[0.65rem] w-[0.65rem] border-r-1 border-b-1 border-l-1 border-t-3 border-black" />
    </_Square>
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

function _Stripe() {
  return (
    <div className="flex-gcrow flex h-4 flex-col justify-evenly bg-[#ddd]">
      <div className="h-0.5 bg-[#999999]" />
      <div className="h-0.5 bg-[#999999]" />
      <div className="h-0.5 bg-[#999999]" />
      <div className="h-0.5 bg-[#999999]" />
      <div className="h-0.5 bg-[#999999]" />
    </div>
  );
}
