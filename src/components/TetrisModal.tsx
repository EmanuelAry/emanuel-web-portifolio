import Image from 'next/image';
import { Rnd } from 'react-rnd';
import { ReactNode, useRef, useState, useEffect, useCallback } from 'react';
import tetris from '../assets/shortcuts/tetris.png';
import '../styles/global.css';

const COLS = 10;
const ROWS = 20;
const CELL_SIZE = 30; 
const TICK_INTERVAL = 500; 

// Cores das peças
const COLORS = [
  '#000000', // índice 0 = vazio
  '#00FFFF', // I - ciano
  '#FFFF00', // O - amarelo
  '#800080', // T - roxo
  '#00FF00', // S - verde
  '#FF0000', // Z - vermelho
  '#0000FF', // J - azul
  '#FFA500', // L - laranja
];

const SHAPES = [
  // I
  [[1, 1, 1, 1]],
  // O
  [
    [1, 1],
    [1, 1],
  ],
  // T
  [
    [0, 1, 0],
    [1, 1, 1],
  ],
  // S
  [
    [0, 1, 1],
    [1, 1, 0],
  ],
  // Z
  [
    [1, 1, 0],
    [0, 1, 1],
  ],
  // J
  [
    [1, 0, 0],
    [1, 1, 1],
  ],
  // L
  [
    [0, 0, 1],
    [1, 1, 1],
  ],
];

const PIECE_COLORS = [0, 1, 2, 3, 4, 5, 6, 7];

type Piece = {
  shape: number[][];
  colorIndex: number;
  x: number;
  y: number;
};

function Tetris() {
  const [board, setBoard] = useState<number[][]>(() =>
    Array.from({ length: ROWS }, () => Array(COLS).fill(0))
  );
  const [currentPiece, setCurrentPiece] = useState<Piece | null>(null);
  const [nextPiece, setNextPiece] = useState<Piece | null>(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const boardCanvasRef = useRef<HTMLCanvasElement>(null);
  const nextCanvasRef = useRef<HTMLCanvasElement>(null);
  const tickIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const randomPiece = useCallback((): Piece => {
    const type = Math.floor(Math.random() * SHAPES.length);
    const shape = SHAPES[type];
    return {
      shape: shape.map(row => [...row]), 
      colorIndex: type + 1, 
      x: Math.floor((COLS - shape[0].length) / 2),
      y: 0,
    };
  }, []);

  const collides = useCallback(
    (piece: Piece, newX: number, newY: number) => {
      for (let r = 0; r < piece.shape.length; r++) {
        for (let c = 0; c < piece.shape[0].length; c++) {
          if (piece.shape[r][c] !== 0) {
            const boardX = newX + c;
            const boardY = newY + r;
            if (
              boardX < 0 ||
              boardX >= COLS ||
              boardY >= ROWS ||
              boardY < 0 ||
              board[boardY][boardX] !== 0
            ) {
              return true;
            }
          }
        }
      }
      return false;
    },
    [board]
  );

  const mergePiece = useCallback(() => {
    if (!currentPiece) return;

    const newBoard = board.map(row => [...row]);
    for (let r = 0; r < currentPiece.shape.length; r++) {
      for (let c = 0; c < currentPiece.shape[0].length; c++) {
        if (currentPiece.shape[r][c] !== 0) {
          const boardY = currentPiece.y + r;
          const boardX = currentPiece.x + c;
          if (boardY >= 0 && boardY < ROWS && boardX >= 0 && boardX < COLS) {
            newBoard[boardY][boardX] = currentPiece.colorIndex;
          }
        }
      }
    }

    let linesCleared = 0;
    for (let row = ROWS - 1; row >= 0; ) {
      if (newBoard[row].every(cell => cell !== 0)) {
        newBoard.splice(row, 1);
        newBoard.unshift(Array(COLS).fill(0));
        linesCleared++;
      } else {
        row--;
      }
    }

    if (linesCleared > 0) {
      setScore(prev => prev + linesCleared * 100);
    }

    setBoard(newBoard);
  }, [board, currentPiece]);

  const spawnNewPiece = useCallback(() => {
    if (!nextPiece) {
      const piece1 = randomPiece();
      const piece2 = randomPiece();
      setCurrentPiece(piece1);
      setNextPiece(piece2);
    } else {
      const newCurrent = { ...nextPiece, x: Math.floor((COLS - nextPiece.shape[0].length) / 2), y: 0 };
      if (collides(newCurrent, newCurrent.x, newCurrent.y)) {
        setGameOver(true);
        setIsPlaying(false);
        setCurrentPiece(null);
      } else {
        setCurrentPiece(newCurrent);
        setNextPiece(randomPiece());
      }
    }
  }, [nextPiece, randomPiece, collides]);

  const movePiece = useCallback(
    (dx: number, dy: number) => {
      if (!currentPiece || gameOver || !isPlaying) return false;
      const newX = currentPiece.x + dx;
      const newY = currentPiece.y + dy;
      if (!collides(currentPiece, newX, newY)) {
        setCurrentPiece({ ...currentPiece, x: newX, y: newY });
        return true;
      }
      if (dy > 0) {
        mergePiece();
        spawnNewPiece();
      }
      return false;
    },
    [currentPiece, collides, mergePiece, spawnNewPiece, gameOver, isPlaying]
  );

  const rotatePiece = useCallback(() => {
    if (!currentPiece || gameOver || !isPlaying) return;
    const rotated = currentPiece.shape[0].map((_, idx) =>
      currentPiece.shape.map(row => row[idx]).reverse()
    );
    const rotatedPiece = { ...currentPiece, shape: rotated };
    if (!collides(rotatedPiece, rotatedPiece.x, rotatedPiece.y)) {
      setCurrentPiece(rotatedPiece);
    }
  }, [currentPiece, collides, gameOver, isPlaying]);

  const hardDrop = useCallback(() => {
    if (!currentPiece || gameOver || !isPlaying) return;
    while (!collides(currentPiece, currentPiece.x, currentPiece.y + 1)) {
      setCurrentPiece(prev => (prev ? { ...prev, y: prev.y + 1 } : prev));
    }
    mergePiece();
    spawnNewPiece();
  }, [currentPiece, collides, mergePiece, spawnNewPiece, gameOver, isPlaying]);

  useEffect(() => {
    const canvas = boardCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        const cell = board[row][col];
        ctx.fillStyle = COLORS[cell] || '#111';
        ctx.fillRect(col * CELL_SIZE, row * CELL_SIZE, CELL_SIZE - 1, CELL_SIZE - 1);
        ctx.strokeStyle = '#333';
        ctx.strokeRect(col * CELL_SIZE, row * CELL_SIZE, CELL_SIZE, CELL_SIZE);
      }
    }

    if (currentPiece && isPlaying && !gameOver) {
      for (let r = 0; r < currentPiece.shape.length; r++) {
        for (let c = 0; c < currentPiece.shape[0].length; c++) {
          if (currentPiece.shape[r][c] !== 0) {
            const x = (currentPiece.x + c) * CELL_SIZE;
            const y = (currentPiece.y + r) * CELL_SIZE;
            ctx.fillStyle = COLORS[currentPiece.colorIndex];
            ctx.fillRect(x, y, CELL_SIZE - 1, CELL_SIZE - 1);
            ctx.strokeStyle = '#333';
            ctx.strokeRect(x, y, CELL_SIZE, CELL_SIZE);
          }
        }
      }
    }
  }, [board, currentPiece, isPlaying, gameOver]);

  useEffect(() => {
    const canvas = nextCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (nextPiece) {
      const shape = nextPiece.shape;
      const color = COLORS[nextPiece.colorIndex];
      for (let r = 0; r < shape.length; r++) {
        for (let c = 0; c < shape[0].length; c++) {
          if (shape[r][c] !== 0) {
            ctx.fillStyle = color;
            ctx.fillRect(c * CELL_SIZE, r * CELL_SIZE, CELL_SIZE - 1, CELL_SIZE - 1);
            ctx.strokeStyle = '#333';
            ctx.strokeRect(c * CELL_SIZE, r * CELL_SIZE, CELL_SIZE, CELL_SIZE);
          }
        }
      }
    }
  }, [nextPiece]);

  const startGame = useCallback(() => {
    setBoard(Array.from({ length: ROWS }, () => Array(COLS).fill(0)));
    setScore(0);
    setGameOver(false);
    setIsPlaying(true);
    const firstPiece = randomPiece();
    const secondPiece = randomPiece();
    setCurrentPiece(firstPiece);
    setNextPiece(secondPiece);
  }, [randomPiece]);

  useEffect(() => {
    if (isPlaying && !gameOver) {
      tickIntervalRef.current = setInterval(() => {
        movePiece(0, 1);
      }, TICK_INTERVAL);
    }
    return () => {
      if (tickIntervalRef.current) clearInterval(tickIntervalRef.current);
    };
  }, [isPlaying, gameOver, movePiece]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isPlaying || gameOver) return;
      e.preventDefault();
      switch (e.key) {
        case 'ArrowLeft':
          movePiece(-1, 0);
          break;
        case 'ArrowRight':
          movePiece(1, 0);
          break;
        case 'ArrowDown':
          movePiece(0, 1);
          break;
        case 'ArrowUp':
          rotatePiece();
          break;
        case ' ':
          hardDrop();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, gameOver, movePiece, rotatePiece, hardDrop]);

  return (
    <div className="flex flex-row gap-4 items-start">
      <canvas
        ref={boardCanvasRef}
        width={COLS * CELL_SIZE}
        height={ROWS * CELL_SIZE}
        className="border border-gray-600"
      />

      <div className="flex flex-col gap-3">
        <div className="bg-gray-200 p-2 border border-gray-400">
          <div className="text-sm font-bold">Next:</div>
          <canvas
            ref={nextCanvasRef}
            width={4 * CELL_SIZE}
            height={4 * CELL_SIZE}
            className="border border-gray-600"
          />
        </div>

        <div className="bg-gray-200 p-2 border border-gray-400">
          <div className="text-sm font-bold">Score:</div>
          <div className="text-lg">{score}</div>
        </div>

        {!isPlaying && !gameOver && (
          <button
            onClick={startGame}
            className="bg-blue-600 text-white px-3 py-1 border border-white active:border-black"
          >
            Start
          </button>
        )}

        {isPlaying && (
          <button
            onClick={() => setIsPlaying(false)}
            className="bg-yellow-600 text-white px-3 py-1 border border-white active:border-black"
          >
            Pause
          </button>
        )}

        {gameOver && (
          <div className="text-red-600 font-bold">Game Over</div>
        )}

        {(gameOver || !isPlaying) && (
          <button
            onClick={startGame}
            className="bg-green-600 text-white px-3 py-1 border border-white active:border-black"
          >
            New Game
          </button>
        )}
      </div>
    </div>
  );
}

const initialSize = {
  height: 700,
  width: 800,
};

export default function TetrisModal({ closeModal }: { closeModal: () => void }) {
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
        height: window.innerHeight - 22,
        width: window.innerWidth,
      });
      ref.current?.updatePosition({
        y: 22,
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
      minHeight={700}
      minWidth={800}
      default={{
        y: 10,
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
          <div className="mx-1 flex flex-row items-center gap-1">
            <Image
              src={tetris}
              alt="Folder with tetris logo"
              className="h-5 w-5"
            />
            <span className="text-base font-bold text-[#FFF] tracking-widest">Tetris</span>
          </div>
          <div className="flex flex-row items-center gap-1">
            <_Maximize onClick={toggleSize} />
            <_Close onClick={closeModal} />
          </div>
        </div>
        <div className="mt-1 flex flex-1 cursor-default! flex-col gap-3 border-2 border-t-[#888] border-r-white border-b-white border-l-[#888] bg-white p-3 items-center h-[calc(100%-2.5rem)] overflow-auto">
          <Tetris />
        </div>
      </div>
    </Rnd>
  );
}

function _Square({ children, onClick }: { children?: ReactNode; onClick?: () => void }) {
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
      <div className="relative h-[0.65rem] w-[0.65rem] border-r-1 border-b-1 border-l-1 border-t-3 border-black" />
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