import React from "react";
import FilterWidget from "./FilterWidget";
import VolumeSlider from "./VolumeSlider";

interface MainScreenProps {
  content: string;
}

const widgetMap: { [key: string]: React.FC<any> } = {
  FilterWidget,
  VolumeSlider,
};

type JSONShape = {
  widget: string;
  props: { [key: string]: any };
};

const MainScreen: React.FC<MainScreenProps> = ({ content }) => {
  // Regex to match JSON-like widget definitions
  const widgetRegex =
    /{{\s*("widget":\s*"[^"]+",\s*"props":\s*{[\s\S]*?})\s*}}/g;

  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = widgetRegex.exec(content)) !== null) {
    const jsonStr = `{${match[1]}}`;
    try {
      const json = JSON.parse(jsonStr) as JSONShape;
      const WidgetComponent = widgetMap[json.widget];

      if (WidgetComponent) {
        // Push text before the widget
        parts.push(content.slice(lastIndex, match.index));
        // Push the widget component
        parts.push(<WidgetComponent key={match.index} {...json.props} />);
      }
    } catch (error) {
      console.error("Failed to parse widget JSON:", error);
    }

    lastIndex = widgetRegex.lastIndex;
  }

  // Push remaining text after the last widget
  parts.push(content.slice(lastIndex));

  return <div className="main-screen">{parts}</div>;
};

export default MainScreen;
