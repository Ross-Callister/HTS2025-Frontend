import React, { useState } from "react";
import "./FilterWidget.css";

const filterOptions = ["Option 1", "Option 2", "Option 3"];

const FilterWidget: React.FC = () => {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleOption = (option: string) => {
    setSelected((prev) =>
      prev.includes(option)
        ? prev.filter((o) => o !== option)
        : [...prev, option]
    );
  };

  return (
    <div className="filter-widget">
      <span style={{ fontWeight: "bold" }}>Filter:</span>
      {filterOptions.map((option) => (
        <label key={option} style={{ marginLeft: 8 }}>
          <input
            type="checkbox"
            checked={selected.includes(option)}
            onChange={() => toggleOption(option)}
          />
          {option}
        </label>
      ))}
    </div>
  );
};

export default FilterWidget;
