import React from "react";
import { observer } from "mobx-react-lite";
import { filterWidgetManager } from "../stores/FilterWidgetManager";
import "./FilterWidget.css";

export type FilterProps = {
  turbo?: boolean;
  xray?: boolean;
  reverse?: boolean;
};

const FilterWidget: React.FC<FilterProps> = observer(
  ({ turbo, xray, reverse }) => {
    // Initialize filters with props if provided
    React.useEffect(() => {
      if (turbo !== undefined) filterWidgetManager.setTurbo(turbo);
      if (xray !== undefined) filterWidgetManager.setXray(xray);
      if (reverse !== undefined) filterWidgetManager.setReverse(reverse);
    }, []);

    return (
      <div className="filter-widget">
        <span style={{ fontWeight: "bold" }}>Filter:</span>
        <CheckBox
          label="Turbo"
          checked={filterWidgetManager.turbo}
          onChange={() =>
            filterWidgetManager.setTurbo(!filterWidgetManager.turbo)
          }
        />
        <CheckBox
          label="Xray"
          checked={filterWidgetManager.xray}
          onChange={() =>
            filterWidgetManager.setXray(!filterWidgetManager.xray)
          }
        />
        <CheckBox
          label="Reverse"
          checked={filterWidgetManager.reverse}
          onChange={() =>
            filterWidgetManager.setReverse(!filterWidgetManager.reverse)
          }
        />
      </div>
    );
  }
);

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
