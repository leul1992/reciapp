import React from "react";

function PreferenceCategory({ icon: Icon, label, isActive, onClick }) {
  return (
    <div className="cursor-pointer" onClick={onClick}>
      <h3 className={`font-semibold flex items-center gap-2 ${isActive ? "text-blue-500" : ""}`}>
        <Icon /> {label}
      </h3>
    </div>
  );
}

export default PreferenceCategory;
