"use client";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import Image from "next/image";
import { motion } from "framer-motion";
import { FiHeart } from "react-icons/fi";

const Celebration = ({ onComplete }) => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 800,
    height: typeof window !== "undefined" ? window.innerHeight : 600,
  });
  const [showConfetti, setShowConfetti] = useState(true);

  // Actualizar dimensiones al redimensionar la ventana
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    // Detener confeti después de 5 segundos
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm">
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={200}
          gravity={0.15}
          colors={["#4a90e2", "#74b0ff", "#43c6ac", "#ffffff"]}
        />
      )}

      <motion.div
        className="bg-white max-w-md w-full mx-4 p-8 rounded-xl shadow-hover"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 25,
        }}
      >
        <div className="text-center">
          <motion.div
            className="inline-block mb-4"
            animate={{ rotate: [0, 10, -10, 10, 0] }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <Image
              src="/images/decorations/stitch-happy.png"
              alt="Stitch feliz"
              width={100}
              height={100}
              className="h-30 w-auto mx-auto object-contain"
              onError={(e) => {
                console.error("Error cargando imagen de Stitch feliz");
                e.target.style.display = "none";
              }}
            />
          </motion.div>

          <motion.h2
            className="text-2xl text-blue-600 font-bold text-primary mb-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            ¡Has completado todos los niveles mi amor!
          </motion.h2>

          <motion.p
            className="text-text-light mb-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Ahora puedes seguir para poder ver todos estos mensajitos que he
            preparado para ti mi princesita hermosa, ayyyy en serio que te amo
            muchísimo.
          </motion.p>

          <motion.button
            onClick={onComplete}
            className="custom-button custom-button-primary"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <FiHeart className="icon" />
            Ver Mensajes
          </motion.button>

          {/* Botón para omitir la animación (solo para pruebas) */}
          {/* <div className="mt-2">
            <button
              onClick={onComplete}
              className="text-xs bg-gray-200 text-gray-500 px-2 py-1 rounded hover:bg-gray-300"
            >
              Omitir (Modo Prueba)
            </button>
          </div> */}
        </div>
      </motion.div>
    </div>
  );
};

export default Celebration;
