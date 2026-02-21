'use client';

import StartMenuModal from '@/components/StartMenuModal';
import CalculatorModal from '@/components/CalculatorModal';
import GitHubModal from '@/components/GitHubModal';
import FigmaModal from '@/components/FigmaModal';
import PongModal from '@/components/PongModal';
import TetrisModal from '@/components/TetrisModal';
import ProjectsModal from '@/components/ProjectsModal';
import Shortcut from '@/components/Shortcut';
import Taskbar from '@/components/Taskbar';
import { useIsMobile } from '@/hooks/useIsMobile';
import { useRef, useState } from 'react';

import projects from '../assets/shortcuts/directory_admin_tools.png';
import figma from '../assets/shortcuts/figma.png';
import github from '../assets/shortcuts/github.png';
import web from '../assets/shortcuts/search_web-0.png';
import linkedin from '../assets/shortcuts/linkedin.png';
import resume from '../assets/shortcuts/resume.png';
import youtube from '../assets/shortcuts/youtube.png';
import calcIcon from '../assets/icons/Applications/Calculator.png';
import pongIcon from '../assets/icons/Applications/pong.png';
import tetrisIcon from '../assets/shortcuts/tetris.png';

export default function Home() {
  const ref = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();
  const [projectModalIsOpen, setProjectsModalIsOpen] = useState(false);
  const [githubModalIsOpen, setGithubModalIsOpen] = useState(!isMobile);
  const [figmaModalIsOpen, setFigmaModalIsOpen] = useState(false);
  const [calcIsOpen, setCalcIsOpen] = useState(false);
  const [startMenuIsOpen, setStartMenuIsOpen] = useState(false);
  const [pongIsOpen, setPongIsOpen] = useState(false);
  const [tetrisIsOpen, setTetrisIsOpen] = useState(false);

  const closeProjectsModal = () => setProjectsModalIsOpen(false);
  const closeFigmaModal = () => setFigmaModalIsOpen(false);
  
  const openGithub = () => setGithubModalIsOpen(true);
  const closeGithubModal = () => setGithubModalIsOpen(false);
  const openFigma = () => setFigmaModalIsOpen(true);
  const openLinkedIn = () =>
    window.open('https://www.linkedin.com/in/emanuel-oliveira-4010841a2/', '_blank');

  const openYouTube = () =>
    window.open(
      'https://www.youtube.com/@emanuel_ary_dev/featured',
      '_blank',
    );

  const openGoogle = () => window.open('https://www.google.com/', '_blank');

  const openProjects = () => setProjectsModalIsOpen(true);

  const openResume = () =>
    window.open('/resumes/Emanuel Ary de Oliveira - Curriculo.pdf', '_blank');

  return (
    <>
      <main
        ref={ref}
        className={
          isMobile
          ? 'flex flex-1 flex-col items-center gap-2 overflow-auto p-4'
          : 'relative flex flex-1 flex-col flex-wrap content-start gap-2 overflow-hidden p-4'
        }
        >
        <Shortcut image={github} title="Github" action={openGithub} />
        <Shortcut image={projects} title="Projects" action={openProjects} />
        <Shortcut image={resume} title="Resume" action={openResume} />
        <Shortcut image={linkedin} title="LinkedIn" action={openLinkedIn} />
        <Shortcut image={youtube} title="YouTube" action={openYouTube} />
        <Shortcut image={web} title="Internet" action={openGoogle} />
        <Shortcut image={figma} title="Figma" action={openFigma} />

        {!isMobile && (
          <>
            <Shortcut
              image={calcIcon}
              title="Calc"
              action={() => setCalcIsOpen(true)}
              />
            <Shortcut
              image={pongIcon}
              title="Pong"
              action={() => setPongIsOpen(true)}
              />
            <Shortcut
              image={tetrisIcon}
              title="Tetris"
              action={() => setTetrisIsOpen(true)}
              />

            {projectModalIsOpen && <ProjectsModal closeModal={closeProjectsModal} />}
            {figmaModalIsOpen && <FigmaModal closeModal={closeFigmaModal} />}
            {githubModalIsOpen && <GitHubModal closeModal={closeGithubModal} />}
            {calcIsOpen && (
              <CalculatorModal closeModal={() => setCalcIsOpen(false)} />
            )}
            {pongIsOpen && (
              <PongModal closeModal={() => setPongIsOpen(false)} />
            )}
            {tetrisIsOpen && (
              <TetrisModal closeModal={() => setTetrisIsOpen(false)} />
            )}
            {startMenuIsOpen && (
              <StartMenuModal 
                startMenuOpen={startMenuIsOpen}
                onCloseStartMenu={() => setStartMenuIsOpen(false)}
                onOpenCalc={() => setCalcIsOpen(true)}
                onOpenPong={() => setPongIsOpen(true)}
                onOpenGithub={() => setGithubModalIsOpen(true)}
                closeModal={() => setStartMenuIsOpen(false)}
               />
            )}
          </>
        )}
      </main>
      {!isMobile && (
        <Taskbar
          startMenuOpen={startMenuIsOpen}
          isOpenCalc={calcIsOpen}
          isOpenPong={pongIsOpen}
          isOpenGithub={githubModalIsOpen}
          isOpenFigma={figmaModalIsOpen}
          isOpenProject={projectModalIsOpen}
          isOpenTetris={tetrisIsOpen}
          onOpenStartMenu={() => setStartMenuIsOpen(true)}
          onCloseStartMenu={() => setStartMenuIsOpen(false)}
          onCloseCalc={()=>setCalcIsOpen(false)}
          onClosePong={()=>setPongIsOpen(false)}
          onCloseGitHub={()=>setGithubModalIsOpen(false)}
          onCloseFigma={()=>setFigmaModalIsOpen(false)}
          onCloseProject={()=>setProjectsModalIsOpen(false)}
          onCloseTetris={()=>setTetrisIsOpen(false)}
        />
      )}
    </>
  );
}
