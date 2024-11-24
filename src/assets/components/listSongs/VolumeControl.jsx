// Context
import { useAudio } from "../../context/AudioContext"; 

// Componente para controlar el volumen de la pista de audio
const VolumeControl = () => {
  const { changeVolume, volume } = useAudio();

  /**
   * Maneja el cambio en el rango del volumen.
   * @param {React.ChangeEvent<HTMLInputElement>} e
   */
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    changeVolume(newVolume);
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <label className="fs-6 text-muted ms-2" htmlFor="volume">Volumen:</label>
      <input
        id="volume"
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={handleVolumeChange}
        style={{ width: "150px" }}
      />
    </div>
  );
};

export default VolumeControl;
