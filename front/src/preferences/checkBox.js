import React from "react";

function CheckBox({ name, value, checked, onChange }) {
  return (
    <div
      className={`my-1 text-center text-sm py-2 px-4 flex-shrink-0 ${
        checked ? "bg-green-500 hover:bg-green-400" : "bg-[#254e30] hover:bg-[#345a3e]"
      } text-white cursor-pointer rounded-lg mx-1`}
      onClick={onChange}
      style={{ width: "120px" }} // Inline style to set a fixed width
    >
      {value}
    </div>
  );
}

export default CheckBox;
