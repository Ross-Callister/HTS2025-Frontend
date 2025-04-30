import React from "react";
import FilterWidget from "./FilterWidget";
import VolumeSlider from "./VolumeSlider";

interface MainScreenProps {
  content: string;
}

const WIDGET_MARKER = "{{FilterWidget}}";
const VOLUME_MARKER = "{{VolumeSlider}}";

const MainScreen: React.FC<MainScreenProps> = ({ content }) => {
  // Split the content by the widget markers and interleave with the widgets
  const parts = content.split(
    new RegExp(`(${WIDGET_MARKER}|${VOLUME_MARKER})`)
  );

  return (
    <div className="main-screen">
      {parts.map((part, idx) => {
        if (part === WIDGET_MARKER) {
          return <FilterWidget key={idx} turbo xray reverse />;
        } else if (part === VOLUME_MARKER) {
          return <VolumeSlider key={idx} initialVolume={50} />;
        } else {
          return <React.Fragment key={idx}>{part}</React.Fragment>;
        }
      })}
    </div>
  );
};

export default MainScreen;
