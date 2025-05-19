"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import usePuzzle from "../hooks/usePuzzle";
import { FiEye, FiEyeOff, FiRefreshCw } from "react-icons/fi";

const SlidingPuzzle = ({ level, size = 3, onComplete, puzzleImage }) => {
  const {
    tiles,
    isSolved,
    moveCount,
    moveTile,
    canMoveTile,
    initializePuzzle,
  } = usePuzzle(size, level);
  const [showPreview, setShowPreview] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [puzzleSize, setPuzzleSize] = useState({ width: 300, height: 300 });
  const [tileSize, setTileSize] = useState(100);

  // Ajustar tamaño del puzzle según el tamaño de pantalla
  useEffect(() => {
    const updatePuzzleSize = () => {
      // Calcular tamaño base según el ancho de la ventana
      const isSmallScreen = window.innerWidth < 640;
      const isMediumScreen =
        window.innerWidth >= 640 && window.innerWidth < 1024;

      let baseSize;
      if (isSmallScreen) {
        baseSize = Math.min(window.innerWidth * 0.85, 300);
      } else if (isMediumScreen) {
        baseSize = Math.min(window.innerWidth * 0.6, 400);
      } else {
        baseSize = 400; // Tamaño para pantallas grandes
      }

      // Asegurar que el puzzle es cuadrado
      const newSize = {
        width: baseSize,
        height: baseSize,
      };

      setPuzzleSize(newSize);
      setTileSize(baseSize / size);
    };

    updatePuzzleSize();
    window.addEventListener("resize", updatePuzzleSize);

    return () => {
      window.removeEventListener("resize", updatePuzzleSize);
    };
  }, [size]);

  // Resetear el estado completed cuando cambia el nivel
  useEffect(() => {
    setCompleted(false);
  }, [level]);

  // Detectar cuando se completa el puzzle
  useEffect(() => {
    if (isSolved && !completed) {
      // Pequeño retraso para que se vea la última pieza moverse
      const timer = setTimeout(() => {
        setCompleted(true);
        onComplete && onComplete(level);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [isSolved, onComplete, level, completed]);

  // Estilo para las piezas del rompecabezas
  const getPuzzleTileStyle = (tile) => {
    // Calcular posición original (para la imagen)
    const row = Math.floor(tile.id / size);
    const col = tile.id % size;

    // Calcular posición actual (para posicionamiento)
    const currentRow = Math.floor(tile.currentPosition / size);
    const currentCol = tile.currentPosition % size;

    return {
      width: `${tileSize}px`,
      height: `${tileSize}px`,
      top: `${currentRow * tileSize}px`,
      left: `${currentCol * tileSize}px`,
      backgroundImage: tile.isEmpty ? "none" : `url(${puzzleImage})`,
      backgroundSize: `${puzzleSize.width}px ${puzzleSize.height}px`,
      backgroundPosition: `-${col * tileSize}px -${row * tileSize}px`,
      cursor:
        canMoveTile(tile.currentPosition) && !isSolved ? "pointer" : "default",
      opacity: tile.isEmpty ? "0" : "1",
    };
  };

  return (
    <div className="flex flex-col items-center px-4 max-w-full w-full">
      {/* Información del puzzle */}
      <div className="w-full max-w-md flex flex-col sm:flex-row items-center justify-between mb-4 gap-4">
        <div className="bg-primary text-white px-4 py-2 rounded-full text-sm font-medium shadow-soft flex items-center">
          <div className="flex items-center">
            <span>Nivel {level}</span>
            <span className="mx-2 text-white opacity-50">•</span>
            <span>{moveCount} Movimientos</span>
          </div>
        </div>

        <div className="flex gap-3 justify-center">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="custom-button custom-button-secondary"
          >
            {showPreview ? (
              <>
                <FiEyeOff className="icon" />
                <span>Ocultar</span>
              </>
            ) : (
              <>
                <FiEye className="icon" />
                <span>Ver Imagen</span>
              </>
            )}
          </button>

          <button
            onClick={initializePuzzle}
            className="custom-button custom-button-primary"
          >
            <FiRefreshCw className="icon" />
            <span>Reiniciar</span>
          </button>
        </div>
      </div>

      {/* Vista previa de la imagen */}
      {showPreview && (
        <motion.div
          className="mb-4 bg-white rounded-lg shadow-soft overflow-hidden"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.2 }}
        >
          <img
            src={puzzleImage}
            alt="Vista previa"
            className="w-full h-auto max-w-[300px] max-h-[300px] object-contain"
            onError={(e) => {
              console.error("Error cargando imagen:", puzzleImage);
              e.target.src =
                "https://via.placeholder.com/300?text=Imagen+no+encontrada";
            }}
          />
        </motion.div>
      )}

      {/* Contenedor del puzzle */}
      <div
        className="puzzle-container bg-white"
        style={{
          width: `${puzzleSize.width}px`,
          height: `${puzzleSize.height}px`,
        }}
      >
        {tiles.map((tile) => (
          <motion.div
            key={tile.id}
            className={`puzzle-tile ${
              canMoveTile(tile.currentPosition) && !isSolved
                ? "hover:shadow-hover"
                : ""
            }`}
            style={getPuzzleTileStyle(tile)}
            onClick={() => moveTile(tile.currentPosition)}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: tile.isEmpty ? 0 : 1,
              transition: { duration: 0.2 },
            }}
            layout
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              duration: 0.2,
            }}
          />
        ))}

        {/* Overlay de completado */}
        {completed && (
          <motion.div
            className="absolute inset-0 bg-primary bg-opacity-40 flex items-center justify-center backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="bg-white p-4 rounded-xl text-center shadow-hover"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <h3 className="text-xl font-bold text-primary mb-1">
                ¡Completado!
              </h3>
              <p className="text-text-light text-sm">
                Nivel {level} • {moveCount} movimientos
              </p>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SlidingPuzzle;
