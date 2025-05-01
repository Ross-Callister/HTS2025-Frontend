import React from "react";
import { observer } from "mobx-react-lite";
import { volumeSliderManager } from "../stores/VolumeSliderManager";
import "./VolumeSlider.css";

type VolumeSliderProps = {
  newVolume?: number;
};

const VolumeSlider: React.FC<VolumeSliderProps> = observer(({ newVolume }) => {
  // Initialize volume with prop if provided
  React.useEffect(() => {
    if (newVolume !== undefined) {
      volumeSliderManager.setVolume(newVolume);
    }
  }, []);

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    volumeSliderManager.setVolume(Number(event.target.value));
  };

  return (
    <div className="volume-slider">
      <span style={{ fontWeight: "bold" }}>Volume:</span>
      <input
        type="range"
        min="0"
        max="100"
        value={volumeSliderManager.volume}
        onChange={handleVolumeChange}
        style={{ marginLeft: 8 }}
      />
      <span style={{ marginLeft: 8 }}>{volumeSliderManager.volume}%</span>
    </div>
  );
});

export default VolumeSlider;
