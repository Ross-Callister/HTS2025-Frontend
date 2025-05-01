import React from "react";
import FilterWidget from "../components/FilterWidget";
import VolumeSlider from "../components/VolumeSlider";

const widgetMap: { [key: string]: React.FC<any> } = {
  FilterWidget,
  VolumeSlider,
};

type JSONShape = {
  widget: string;
  props: { [key: string]: any };
};

export const parseWidgets = (text: string): (string | React.ReactElement)[] => {
  // Regex to match JSON-like widget definitions
  const widgetRegex =
    /{{\s*("widget":\s*"[^"]+",\s*"props":\s*{[\s\S]*?})\s*}}/g;

  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = widgetRegex.exec(text)) !== null) {
    const jsonStr = `{${match[1]}}`;
    try {
      const json = JSON.parse(jsonStr) as JSONShape;
      const WidgetComponent = widgetMap[json.widget];

      if (WidgetComponent) {
        // Push text before the widget
        parts.push(text.slice(lastIndex, match.index));
        // Push the widget component
        parts.push(<WidgetComponent key={match.index} {...json.props} />);
      }
    } catch (error) {
      console.error("Failed to parse widget JSON:", error);
    }

    lastIndex = widgetRegex.lastIndex;
  }

  // Push remaining text after the last widget
  parts.push(text.slice(lastIndex));

  return parts;
};
