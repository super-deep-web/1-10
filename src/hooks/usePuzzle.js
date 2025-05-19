"use client";
import { useState, useEffect, useCallback } from "react";

// Hook para manejar la lógica del rompecabezas
export default function usePuzzle(size = 3, level = 1) {
  // Estado para las piezas del rompecabezas
  const [tiles, setTiles] = useState([]);
  // Posición de la casilla vacía
  const [emptyIndex, setEmptyIndex] = useState(size * size - 1);
  // Estado para saber si el rompecabezas está resuelto
  const [isSolved, setIsSolved] = useState(false);
  // Número de movimientos realizados
  const [moveCount, setMoveCount] = useState(0);

  // Inicializar el rompecabezas
  const initializePuzzle = useCallback(() => {
    // Crear una cuadrícula ordenada
    let initialTiles = Array.from({ length: size * size }, (_, index) => ({
      id: index,
      currentPosition: index,
      isEmpty: index === size * size - 1,
    }));

    // Mezclar el rompecabezas (asegurando que sea resoluble)
    const shuffledTiles = shuffleTiles([...initialTiles], size);

    setTiles(shuffledTiles);
    // Encontrar el nuevo índice vacío
    const newEmptyIndex = shuffledTiles.findIndex((tile) => tile.isEmpty);
    setEmptyIndex(newEmptyIndex);
    setIsSolved(false);
    setMoveCount(0);
  }, [size, level]); // Añadimos level como dependencia

  // Algoritmo de mezcla que garantiza que el puzzle sea resoluble
  const shuffleTiles = (tilesArray, size) => {
    // Definir número de movimientos aleatorios según dificultad
    // Para niveles más altos, más movimientos (más difícil)
    const baseMoves = 50;
    const additionalMoves = level * 25;
    const moves = baseMoves + additionalMoves;

    let currentEmptyIndex = size * size - 1;

    for (let i = 0; i < moves; i++) {
      // Encontrar vecinos movibles (arriba, abajo, izquierda, derecha)
      const possibleMoves = [];

      // Arriba
      if (currentEmptyIndex >= size) {
        possibleMoves.push(currentEmptyIndex - size);
      }
      // Abajo
      if (currentEmptyIndex < size * (size - 1)) {
        possibleMoves.push(currentEmptyIndex + size);
      }
      // Izquierda
      if (currentEmptyIndex % size !== 0) {
        possibleMoves.push(currentEmptyIndex - 1);
      }
      // Derecha
      if (currentEmptyIndex % size !== size - 1) {
        possibleMoves.push(currentEmptyIndex + 1);
      }

      // Seleccionar un movimiento aleatorio
      const randomMoveIndex = Math.floor(Math.random() * possibleMoves.length);
      const tileToMoveIndex = possibleMoves[randomMoveIndex];

      // Intercambiar la baldosa seleccionada con la vacía
      [tilesArray[currentEmptyIndex], tilesArray[tileToMoveIndex]] = [
        tilesArray[tileToMoveIndex],
        tilesArray[currentEmptyIndex],
      ];

      // Actualizar posiciones actuales
      tilesArray[currentEmptyIndex].currentPosition = currentEmptyIndex;
      tilesArray[tileToMoveIndex].currentPosition = tileToMoveIndex;

      // Actualizar el índice vacío
      currentEmptyIndex = tileToMoveIndex;
    }

    // Para niveles fáciles, verificar que el puzzle no esté ya resuelto
    // Si está casi resuelto, mezclar nuevamente
    if (level === 1) {
      const solvedTiles = tilesArray.filter(
        (tile) => tile.id === tile.currentPosition
      );
      if (solvedTiles.length > size * size * 0.7) {
        return shuffleTiles(tilesArray, size);
      }
    }

    return tilesArray;
  };

  // Comprobar si se puede mover una baldosa
  const canMoveTile = (index) => {
    // Calcular coordenadas de fila y columna
    const row = Math.floor(index / size);
    const col = index % size;
    const emptyRow = Math.floor(emptyIndex / size);
    const emptyCol = emptyIndex % size;

    // Una baldosa se puede mover si está en la misma fila o columna que la vacía
    // y es adyacente a ella
    return (
      (row === emptyRow && Math.abs(col - emptyCol) === 1) ||
      (col === emptyCol && Math.abs(row - emptyRow) === 1)
    );
  };

  // Mover una baldosa
  const moveTile = (index) => {
    if (!canMoveTile(index) || isSolved) return false;

    // Intercambiar la baldosa seleccionada con la vacía
    setTiles((prevTiles) => {
      const newTiles = [...prevTiles];

      // Guardar una referencia a las baldosas involucradas
      const tileToMove = { ...newTiles[index] };
      const emptyTile = { ...newTiles[emptyIndex] };

      // Actualizar posiciones
      tileToMove.currentPosition = emptyIndex;
      emptyTile.currentPosition = index;

      // Actualizar el array
      newTiles[emptyIndex] = tileToMove;
      newTiles[index] = emptyTile;

      return newTiles;
    });

    // Actualizar posición vacía
    setEmptyIndex(index);

    // Incrementar contador de movimientos
    setMoveCount((prev) => prev + 1);

    return true;
  };

  // Comprobar si el rompecabezas está resuelto
  useEffect(() => {
    if (tiles.length === 0) return;

    const solved = tiles.every((tile) => tile.id === tile.currentPosition);
    setIsSolved(solved);
  }, [tiles]);

  // Inicializar el rompecabezas al montar el componente o cambiar el nivel
  useEffect(() => {
    // Reiniciar el estado del puzzle cuando cambia el nivel
    setIsSolved(false);
    setMoveCount(0);
    initializePuzzle();
  }, [initializePuzzle, level]);

  return {
    tiles,
    isSolved,
    moveCount,
    moveTile,
    canMoveTile,
    initializePuzzle,
    emptyIndex,
    size,
  };
}
