import React from "react";
import CheckBox from "./checkBox";

function PreferenceDetails({ items, selectedItems, onItemClick }) {
  return (
    <div className="flex overflow-x-auto mt-2">
      {items.map((item, index) => (
        <CheckBox
          key={index}
          name="type"
          value={item}
          checked={selectedItems.includes(item)}
          onChange={() => onItemClick(item)}
        />
      ))}
    </div>
  );
}

export default PreferenceDetails;
