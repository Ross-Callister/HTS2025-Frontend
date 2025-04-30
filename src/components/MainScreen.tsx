import React from "react";
import FilterWidget from "./FilterWidget";

interface MainScreenProps {
  content: string;
}

const WIDGET_MARKER = "{{FilterWidget}}";

const MainScreen: React.FC<MainScreenProps> = ({ content }) => {
  // Split the content by the widget marker and interleave with the widget
  const parts = content.split(WIDGET_MARKER);

  return (
    <div className="main-screen">
      {parts.map((part, idx) => (
        <React.Fragment key={idx}>
          {part}
          {idx < parts.length - 1 && <FilterWidget />}
        </React.Fragment>
      ))}
    </div>
  );
};

export default MainScreen;
