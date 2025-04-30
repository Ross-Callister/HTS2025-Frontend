import React, { useState } from "react";
import "./VolumeSlider.css";

const VolumeSlider: React.FC = () => {
  const [volume, setVolume] = useState(50);

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(event.target.value));
  };

  return (
    <div className="volume-slider">
      <span style={{ fontWeight: "bold" }}>Volume:</span>
      <input
        type="range"
        min="0"
        max="100"
        value={volume}
        onChange={handleVolumeChange}
        style={{ marginLeft: 8 }}
      />
      <span style={{ marginLeft: 8 }}>{volume}%</span>
    </div>
  );
};

export default VolumeSlider;
