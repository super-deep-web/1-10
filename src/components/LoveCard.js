"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { FiHeart, FiArrowLeft, FiArrowRight } from "react-icons/fi";

const LoveCard = ({ message, image, isActive }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      className={`w-full max-w-lg mx-auto h-64 ${
        isActive ? "block" : "hidden"
      }`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div
        className="relative w-full h-full rounded-xl shadow-xl overflow-hidden"
        style={{
          perspective: "1000px",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Frente de la tarjeta */}
        <div
          className={`absolute inset-0 w-full h-full flex flex-col items-center justify-center p-6 bg-white text-center cursor-pointer transition-all duration-500 ${
            isFlipped ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
          onClick={() => setIsFlipped(true)}
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          <div className="flex flex-col items-center justify-center h-full">
            <div className="mb-4">
              {image ? (
                <img
                  src={image}
                  alt=""
                  className="w-24 h-24 object-contain"
                  style={{
                    animation: "pulse 2s infinite",
                  }}
                  onError={(e) => {
                    console.error("Error cargando imagen de tarjeta:", image);
                    e.target.onerror = null;
                    e.target.style.display = "none";
                  }}
                />
              ) : (
                <FiHeart
                  className="w-20 h-20 text-pink-500"
                  style={{
                    animation: "pulse 2s infinite",
                  }}
                />
              )}
            </div>
            <p className="text-gray-500 mb-4">Toca para descubrir</p>
            <div className="mt-2 inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-blue-500 hover:bg-blue-600 transition-colors duration-300">
              <FiHeart className="mr-2" />
              Revelar mensaje
            </div>
          </div>
        </div>

        {/* Parte trasera de la tarjeta */}
        <div
          className={`absolute inset-0 w-full h-full flex flex-col items-center justify-center p-6 bg-white text-center cursor-pointer transition-all duration-500 ${
            isFlipped ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setIsFlipped(false)}
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: isFlipped ? "rotateY(0deg)" : "rotateY(-180deg)",
          }}
        >
          <div className="flex flex-col items-center justify-center h-full">
            <p className="text-xl font-medium text-gray-700 mb-6 italic">
              {message}
            </p>
            <button
              className="inline-flex items-center justify-center px-4 py-2 border border-blue-500 text-base font-medium rounded-full shadow-sm text-blue-600 bg-white hover:bg-blue-50 transition-colors duration-300"
              onClick={(e) => {
                e.stopPropagation();
                setIsFlipped(false);
              }}
            >
              <FiArrowLeft className="mr-2" />
              Volver
            </button>
          </div>
        </div>
      </div>

      {/* Añadir keyframes para animación pulse */}
      <style jsx global>{`
        @keyframes pulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(1);
          }
        }
      `}</style>
    </motion.div>
  );
};

export default LoveCard;
