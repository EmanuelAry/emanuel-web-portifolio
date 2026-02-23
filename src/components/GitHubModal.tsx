import Image from 'next/image';
import { Rnd } from 'react-rnd';

import { ReactNode, useRef, useState } from 'react';
import github from '../assets/shortcuts/github.png';

import '../styles/global.css';

const initialSize = {
  height: 500,
  width: 600,
};

const profile = {
  name: 'Emanuel Ary de Oliveira',
  bio: 'Developing software with quality, usability, and engineering.',
  company: 'UDESC - Universidade Estadual de Santa Catarina',
  location: 'Rio do Sul, SC - Brazil',
  blog: 'https://github.com/EmanuelAry',
  publicRepos: 11,
  followers: 3,
  following: 4,
  avatarUrl: 'https://avatars.githubusercontent.com/u/85082538?v=4',
  profileUrl: 'https://github.com/EmanuelAry',
};

const topRepos = [
  {
    name: 'CaixaEletronico',
    description:
      'Caixa eletrônico para trabalho da disciplina de Testes, funções 100% contempladas com testes unitários, de integração e de sistema com PHPUnit',
    language: 'PHP',
    stars: 1,
    forks: 0,
    url: 'https://github.com/EmanuelAry/CaixaEletronico/',
  },
  {
    name: 'Web Portifólio TypeScritp',
    description: 'Web portifólio com desing inspirado no clássico windows 95',
    language: 'TypeScript',
    stars: 1,
    forks: 0,
    url: 'https://github.com/EmanuelAry/emanuel-web-portifolio',
  },
  {
    name: 'Cadastro de Pessoas com Laravel e Vue',
    description: 'Exemplo básico de utilização do framework larevel em conjunto com Vue',
    language: 'Vue',
    stars: 1,
    forks: 0,
    url: 'https://github.com/EmanuelAry/CastroPessoaLaravelVue',
  },
  {
    name: 'CRUD-C#',
    description: 'Estudo em C#: Aplicativo desktop em C# de cadastro de produtos',
    language: 'C#',
    stars: 1,
    forks: 0,
    url: 'https://github.com/EmanuelAry/CRUD-C-',
  },
];

export default function GitHubModal({closeModal}:{closeModal: () => void;}){
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
        x: initialSize.width / 3,
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
            <Image src={github} alt="GitHub logo" className="h-4 w-4" />
            <span className="text-base font-bold text-[#FFF] tracking-widest">GitHub</span>
          </div>
          <div className='flex flex-row items-center gap-1'>
            <_Maximize onClick={toggleSize} />
            <_Close onClick={closeModal} />
          </div>
        </div>

        {/* Content */}
        <div className="mt-1 flex flex-1 cursor-default! flex-col gap-3 overflow-auto border-2 border-t-[#888] border-r-white border-b-white border-l-[#888] bg-white p-3">
          {/* Profile section */}
          <div className="flex flex-row items-center gap-3">
            <Image
              src={profile.avatarUrl}
              alt="GitHub avatar"
              width={80}
              height={80}
              className="h-20 w-20 border border-[#262626]"
              unoptimized
            />
            <div className="flex flex-col gap-1">
              <a
                href={profile.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-bold text-[#0000EE] underline hover:text-[#551A8B]"
              >
                {profile.name}
              </a>
              <span className="text-base text-[#333]">{profile.bio}</span>
              <div className="mt-1 flex flex-row gap-3 text-sm text-[#555]">
                <span>{profile.company}</span>
                <span>{profile.location}</span>
              </div>
              <div className="flex flex-row gap-3 text-sm text-[#555]">
                <span>{profile.publicRepos} repos</span>
                <span>{profile.followers} followers</span>
                <span>{profile.following} following</span>
              </div>
            </div>
          </div>

          <div className="h-px bg-[#999]" />

          {/* Repos header */}
          <span className="text-base font-bold text-[#333]">
            Top Repositories
          </span>

          {/* Repos list */}
          <div className="flex flex-col gap-2">
            {topRepos.map((repo) => (
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
                  <div className="flex flex-row gap-2 text-sm text-[#555]">
                    <span>&#9733; {repo.stars}</span>
                    <span>&#9906; {repo.forks}</span>
                  </div>
                </div>
                <span className="text-sm text-[#555]">{repo.description}</span>
                {repo.language && (
                  <span className="text-sm text-[#777]">{repo.language}</span>
                )}
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
