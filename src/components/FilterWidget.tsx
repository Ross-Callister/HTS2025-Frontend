import React, { useState } from "react";
import "./FilterWidget.css";

export type FilterProps = {
  turbo: boolean;
  xray: boolean;
  reverse: boolean;
};

const FilterWidget: React.FC<FilterProps> = ({ turbo, xray, reverse }) => {
  const initialState = [];
  if (turbo) initialState.push("turbo");
  if (xray) initialState.push("xray");
  if (reverse) initialState.push("reverse");

  const [selected, setSelected] = useState<string[]>(initialState);

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
      <CheckBox
        label="Turbo"
        checked={selected.includes("turbo")}
        onChange={() => {
          toggleOption("turbo");
        }}
      />
      <CheckBox
        label="Xray"
        checked={selected.includes("xray")}
        onChange={() => {
          toggleOption("xray");
        }}
      />
      <CheckBox
        label="Reverse"
        checked={selected.includes("reverse")}
        onChange={() => {
          toggleOption("reverse");
        }}
      />
    </div>
  );
};

const CheckBox: React.FC<{
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}> = ({ label, checked, onChange }) => {
  return (
    <label style={{ marginLeft: 8 }}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      {label}
    </label>
  );
};

export default FilterWidget;
