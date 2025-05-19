"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SlidingPuzzle from "../components/SlidingPuzzle";
import LoveCard from "../components/LoveCard";
import Celebration from "../components/Celebration";
import {
  FiStar,
  FiHeart,
  FiChevronLeft,
  FiChevronRight,
  FiGift,
  FiSkipForward,
} from "react-icons/fi";
import {
  GiSeaStar,
  GiSeashell,
  GiPalmTree,
  GiButterfly,
  GiBalloons,
  GiFishingHook,
  GiFlowerPot,
} from "react-icons/gi";

export default function Home() {
  // Estados
  const [currentLevel, setCurrentLevel] = useState(1);
  const [completedLevels, setCompletedLevels] = useState([]);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showLoveCards, setShowLoveCards] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  // Imágenes de los puzzles (solo 2 niveles)
  const puzzleImages = [
    "/images/puzzle-1/stitch-beach.jpg",
    "/images/puzzle-2/stitch-butterfly.jpg",
  ];

  // Mensajes de amor para las tarjetas
  const loveMessages = [
    "Cada día contigo significa muchísimo para mi, cada día es único, lleno de vida, lleno de felicidad, de tanto amor que me das.",
    "Sabes muy bien que me encanta esa hermosa sonrisa que tienes, que es tan pura y bella, que contagia esa alegría en mi.",
    "Eres todo para mi amor, te lo he dicho siempre, sin ti practicamente estaría vacío, tú llegaste he hiciste que todo mi mundo tuviese sentido.",
    "Eres como el aire que respiramos, sin ti prácticamente no puedo vivir, y no tampoco pienso en quitarme la vida, ya que quiero estar contigo y si lo que quires es que siga viviendo lo haré.",
    "Viviré, me cuidaré, haré todo lo posible para que te sientas cómoda, feliz, que te sientas amada y respetada, haré todo lo que sea posible para que sepas lo importante que eres.",
    "Estaré contigo por toda la eternidad, esa es mi promesa, te la digo a ti siempre, para que sepas que jamás me apartaré de ti, aún si te preocupa hacerlo, jamás lo haré.",
    "Soy muy afortunado de llamarte tu novio, tu esposito, el amor de tu vida, el padre de nuestros hijos, y aunque la mitad de esas cosas aún no ocurra, lo seré porque estoy seguro de cumplirlo.",
    "Para ti mi princesita es todo mi amor, para ti es todo esto y muchísimo más, porque te merces lo mejor.",
    "Feliz 1 año y 10 mese mi esposita hermosa, te amooooo te amooooooooo te amo mucho mucho mucho muchísimo.",
  ];

  // Imágenes para las tarjetas
  const cardImages = [
    "/images/decorations/heart.png",
    "/images/decorations/butterfly.png",
    "/images/decorations/flower.png",
    "/images/decorations/shell.png",
    "/images/decorations/rose.png",
    "/images/decorations/heart.png",
    "/images/decorations/butterfly.png",
    "/images/decorations/flower.png",
    "/images/decorations/shell.png",
  ];

  // Crear decoraciones minimalistas
  const [decorations, setDecorations] = useState([]);

  useEffect(() => {
    // Función para crear decoraciones flotantes y que caen
    const createDecorations = () => {
      const newDecorations = [];

      // Crear un número limitado de burbujas para mantener el minimalismo
      for (let i = 0; i < 6; i++) {
        newDecorations.push({
          type: "bubble",
          size: 10 + Math.random() * 20,
          x: Math.random() * 100,
          y: Math.random() * 100,
          animationDuration: 15 + Math.random() * 20,
        });
      }

      // Crear elementos decorativos que caen
      const fallingElements = [
        { type: "butterfly", icon: GiButterfly, color: "white" },
        { type: "shell", icon: GiSeashell, color: "primary" },
        { type: "heart", icon: FiHeart, color: "accent" },
        { type: "starfish", icon: GiSeaStar, color: "white" },
        { type: "palm", icon: GiPalmTree, color: "accent" },
        { type: "balloon", icon: GiBalloons, color: "primary" },
        { type: "butterfly", icon: GiButterfly, color: "accent" },
        { type: "heart", icon: FiHeart, color: "primary" },
        { type: "flower", icon: GiFlowerPot, color: "white" },
        { type: "shell", icon: GiSeashell, color: "accent" },
        { type: "fish", icon: GiFishingHook, color: "primary" },
        { type: "starfish", icon: GiSeaStar, color: "white" },
        { type: "butterfly", icon: GiButterfly, color: "primary" },
        { type: "balloon", icon: GiBalloons, color: "accent" },
        { type: "flower", icon: GiFlowerPot, color: "primary" },
        { type: "palm", icon: GiPalmTree, color: "white" },
      ];

      // Añadir elementos que caen con diferentes retrasos
      fallingElements.forEach((element, index) => {
        newDecorations.push({
          ...element,
          size: 28 + Math.floor(Math.random() * 12), // Tamaño más grande para mejor visibilidad
          x: 5 + Math.random() * 90,
          delay: index * 1.5, // Retrasos más cortos para que aparezcan con más frecuencia
          duration: 8 + Math.random() * 7, // Duración más corta para que caigan más rápido
        });
      });

      setDecorations(newDecorations);
    };

    createDecorations();
  }, []);

  // Función para saltar los juegos e ir directamente a las tarjetas
  const skipToLoveCards = () => {
    // Completar artificialmente todos los niveles
    const allLevels = Array.from({ length: 2 }, (_, i) => i + 1);
    setCompletedLevels(allLevels);

    // Mostrar brevemente la celebración y luego las tarjetas
    setShowCelebration(true);
    setTimeout(() => {
      setShowCelebration(false);
      setShowLoveCards(true);
    }, 2000);
  };

  // Función para manejar la compleción de un nivel
  const handleLevelComplete = (level) => {
    if (!completedLevels.includes(level)) {
      const newCompletedLevels = [...completedLevels, level];
      setCompletedLevels(newCompletedLevels);

      // Si hay más niveles, avanzar al siguiente después de un breve retraso
      if (level < 2) {
        setTimeout(() => {
          setCurrentLevel(level + 1);
        }, 1500);
      } else {
        // Si todos los niveles están completos, mostrar la celebración
        setTimeout(() => {
          setShowCelebration(true);
        }, 1000);
      }
    }
  };

  // Manejar la compleción de la celebración
  const handleCelebrationComplete = () => {
    setShowCelebration(false);
    setShowLoveCards(true);
  };

  // Variantes para animaciones
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  };

  return (
    <main className="full-height bg-app">
      {/* Decoraciones minimalistas */}
      {decorations.map((decoration, index) => {
        if (decoration.type === "bubble") {
          return (
            <div
              key={`decoration-${index}`}
              className="floating-bubble"
              style={{
                width: `${decoration.size}px`,
                height: `${decoration.size}px`,
                left: `${decoration.x}%`,
                top: `${decoration.y}%`,
                animation: `gentle-float ${decoration.animationDuration}s infinite ease-in-out`,
              }}
            />
          );
        } else {
          // Elementos decorativos que caen usando React Icons
          const IconComponent = decoration.icon || FiStar;
          const fillColor =
            decoration.color === "primary"
              ? "#4a90e2"
              : decoration.color === "accent"
              ? "#43c6ac"
              : "white";

          return (
            <div
              key={`falling-${index}`}
              className="absolute"
              style={{
                left: `${decoration.x}%`,
                top: "-50px",
                zIndex: 5,
                animation: `fall-float ${
                  decoration.duration || 15
                }s linear infinite`,
                animationDelay: `${decoration.delay || 0}s`,
                color: fillColor,
              }}
            >
              <IconComponent size={decoration.size} />
            </div>
          );
        }
      })}

      {/* Botón flotante para saltar los juegos */}
      {!showLoveCards && (
        <motion.button
          onClick={skipToLoveCards}
          className="fixed bottom-6 right-6 inline-flex items-center justify-center p-4 rounded-full bg-pink-500 text-white shadow-lg hover:bg-pink-600 z-50"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 25, delay: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <div className="flex flex-col items-center">
            <FiSkipForward size={20} className="mb-1" />
            <span className="text-xs font-medium">Ir a mensajes</span>
          </div>
        </motion.button>
      )}

      <div className="content-container">
        <header className="text-center pt-6 pb-4">
          <h1 className="text-3xl font-bold text-white mb-1 drop-shadow-md relative inline-block">
            <span className="relative z-10">Un rompecabezas para ti</span>
          </h1>
          <p className="text-white text-opacity-90 text-sm drop-shadow-md">
            Completa los 2 niveles para poder descrubir la siguiente etapa mi
            amor, diviertete mucho mi esposita hermosa.
            <span className="inline-block mx-1 animate-gentle-float">✨</span>
          </p>

          {/* Indicador de progreso */}
          <div className="flex justify-center mt-3 gap-3">
            {[1, 2].map((level) => (
              <div
                key={`level-${level}`}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  completedLevels.includes(level)
                    ? "bg-white w-6"
                    : level === currentLevel
                    ? "bg-white bg-opacity-70 animate-soft-pulse"
                    : "bg-white bg-opacity-30"
                }`}
              />
            ))}
          </div>
        </header>

        <AnimatePresence mode="wait">
          {!showLoveCards ? (
            <motion.div
              key="puzzle"
              className="responsive-puzzle"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <div className="bg-card rounded-xl p-4 sm:p-6">
                <SlidingPuzzle
                  level={currentLevel}
                  size={3}
                  onComplete={handleLevelComplete}
                  puzzleImage={puzzleImages[currentLevel - 1]}
                />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="love-cards"
              className="px-4 py-2 flex-1 flex flex-col items-center justify-center"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <motion.h2
                className="text-2xl font-bold text-white mb-6 text-center drop-shadow-md"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Mensajes Especiales Para Ti
              </motion.h2>

              {/* Contenedor del carrusel */}
              <div className="w-full max-w-2xl mx-auto relative mb-6">
                {/* Tarjetas */}
                {loveMessages.map((message, index) => {
                  const cardImage =
                    index < cardImages.length ? cardImages[index] : null;
                  return (
                    <LoveCard
                      key={`card-${index}`}
                      message={message}
                      image={cardImage}
                      isActive={index === currentCardIndex}
                    />
                  );
                })}

                {/* Navegación */}
                <div className="flex justify-between w-full mt-6">
                  <button
                    onClick={() =>
                      setCurrentCardIndex((prev) =>
                        prev > 0 ? prev - 1 : loveMessages.length - 1
                      )
                    }
                    className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white bg-opacity-70 text-primary hover:bg-opacity-100 transition-all"
                  >
                    <FiChevronLeft size={24} />
                  </button>

                  <div className="flex items-center space-x-2">
                    {loveMessages.map((_, idx) => (
                      <button
                        key={`dot-${idx}`}
                        className={`w-3 h-3 rounded-full ${
                          idx === currentCardIndex
                            ? "bg-white"
                            : "bg-white bg-opacity-40"
                        }`}
                        onClick={() => setCurrentCardIndex(idx)}
                      />
                    ))}
                  </div>

                  <button
                    onClick={() =>
                      setCurrentCardIndex((prev) =>
                        prev < loveMessages.length - 1 ? prev + 1 : 0
                      )
                    }
                    className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white bg-opacity-70 text-primary hover:bg-opacity-100 transition-all"
                  >
                    <FiChevronRight size={24} />
                  </button>
                </div>
              </div>

              <motion.button
                onClick={() => setShowLoveCards(false)}
                className="inline-flex items-center justify-center px-5 py-2.5 mt-6 rounded-full bg-white text-primary font-medium shadow-md hover:bg-gray-50 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiChevronLeft className="mr-2" />
                Volver al juego
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Celebración */}
      {showCelebration && (
        <Celebration onComplete={handleCelebrationComplete} />
      )}
    </main>
  );
}
