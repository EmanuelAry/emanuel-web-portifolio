'use client';

import StartMenuModal from '@/components/StartMenuModal';
import CalculatorModal from '@/components/CalculatorModal';
import GitHubModal from '@/components/GitHubModal';
import PongModal from '@/components/PongModal';
import ProjectsModal from '@/components/ProjectsModal';
import Shortcut from '@/components/Shortcut';
import Taskbar from '@/components/Taskbar';
import { useIsMobile } from '@/hooks/useIsMobile';
import { useRef, useState } from 'react';

import projects from '../assets/shortcuts/apple-folder.png';
import figma from '../assets/shortcuts/figma.png';
import github from '../assets/shortcuts/github.png';
import web from '../assets/shortcuts/globe.png';
import linkedin from '../assets/shortcuts/linkedin.png';
import resume from '../assets/shortcuts/sheet.png';
import youtube from '../assets/shortcuts/youtube.png';
import calcIcon from '../assets/icons/Applications/Calculator.png';
import pongIcon from '../assets/icons/Applications/Key caps.png';

export default function Home() {
  const ref = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [githubModalIsOpen, setGithubModalIsOpen] = useState(!isMobile);
  const [calcIsOpen, setCalcIsOpen] = useState(false);
  const [starthubIsOpen, setStartHubIsOpen] = useState(false);
  const [pongIsOpen, setPongIsOpen] = useState(false);

  const closeModal = () => setIsOpen(false);

  const openGithub = () => setGithubModalIsOpen(true);
  const closeGithubModal = () => setGithubModalIsOpen(false);

  const openLinkedIn = () =>
    window.open('https://www.linkedin.com/in/emanuel-oliveira-4010841a2/', '_blank');

  const openYouTube = () =>
    window.open(
      'https://www.youtube.com/channel/UCHpt8W_dgXzczsBf9G_rikw',
      '_blank',
    );

  const openGoogle = () => window.open('https://www.google.com/', '_blank');

  const openProjects = () => setIsOpen(true);

  const openResume = () =>
    window.open('/resumes/resume - Henrique Nas - en_US.pdf', '_blank');

  const openFigma = () =>
    window.open(
      'https://www.figma.com/file/djqmmAemzIW4fXShqK3sGo/portifolio?node-id=0%3A1&t=ETabTkTERMww8IxT-1',
      '_blank',
    );

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

            {modalIsOpen && <ProjectsModal closeModal={closeModal} />}
            {githubModalIsOpen && <GitHubModal closeModal={closeGithubModal} />}
            {calcIsOpen && (
              <CalculatorModal closeModal={() => setCalcIsOpen(false)} />
            )}
            {pongIsOpen && (
              <PongModal closeModal={() => setPongIsOpen(false)} />
            )}
            {starthubIsOpen && (
              <StartMenuModal 
                closeModal={() => setStartHubIsOpen(false)}
                isOpen={true}
                onPrograms={() => console.log('Programs clicked')}
                onDocuments={() => console.log('Documents clicked')}
                onSettings={() => console.log('Settings clicked')}
                onFind={() => console.log('Find clicked')}
                onHelp={() => console.log('Help clicked')}
                onRun={() => console.log('Run clicked')}
                onShutDown={() => console.log('Shut Down clicked')}
               />
            )}
          </>
        )}
      </main>
      {!isMobile && (
        <Taskbar
          onOpenStartHub={() => setStartHubIsOpen(true)}
          onCloseStartHub={() => setStartHubIsOpen(false)}
          onOpenCalc={() => setCalcIsOpen(true)}
          onOpenPong={() => setPongIsOpen(true)}
          onOpenGithub={openGithub}
        />
      )}
    </>
  );
}
