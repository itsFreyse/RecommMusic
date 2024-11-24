import { createContext, useState, useContext } from "react";

// Crear el contexto
const AudioContext = createContext();

// Proveedor del contexto
export const AudioProvider = ({ children }) => {
  const [currentAudio, setCurrentAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1); // Volumen inicial (1 = 100%)

  /**
   * Reproduce o pausa una vista previa de audio.
   * @param {string} previewUrl - URL de la vista previa de la canción.
   */
  const toggleAudio = (previewUrl) => {
    if (currentAudio && currentAudio.src === previewUrl) {
      // Alternar entre reproducir y pausar
      isPlaying ? currentAudio.pause() : currentAudio.play();
      setIsPlaying(!isPlaying);
    } else {
      // Pausar el audio actual y reproducir uno nuevo
      if (currentAudio) {
        currentAudio.pause();
      }
      const newAudio = new Audio(previewUrl);
      newAudio.volume = volume; // Asigna el volumen actual
      newAudio.play();
      setCurrentAudio(newAudio);
      setIsPlaying(true);

      // Detener reproducción al finalizar
      newAudio.onended = () => {
        setIsPlaying(false);
      };
    }
  };

  /**
   * Detiene cualquier audio en reproducción.
   */
  const stopAudio = () => {
    if (currentAudio) {
      currentAudio.pause();
      setCurrentAudio(null);
      setIsPlaying(false);
    }
  };

  /**
   * Cambia el volumen del audio actual.
   * @param {number} newVolume - Valor entre 0 (silencio) y 1 (máximo).
   */
  const changeVolume = (newVolume) => {
    setVolume(newVolume);
    if (currentAudio) {
      currentAudio.volume = newVolume; // Ajusta el volumen del audio en reproducción
    }
  };

  return (
    <AudioContext.Provider
      value={{
        toggleAudio,
        stopAudio,
        changeVolume,
        isPlaying,
        currentAudio,
        volume,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useAudio = () => useContext(AudioContext);
