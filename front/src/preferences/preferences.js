import React, { useState } from "react";
import { FaUtensils, FaLeaf, FaExclamationTriangle, FaClock } from "react-icons/fa";
import PreferenceCategory from "./PreferenceCategory";
import PreferenceDetails from "./PreferenceDetails";
import { useSelector, useDispatch } from "react-redux";
import { ADD_PREFERENCE, REMOVE_PREFERENCE, SET_MAX_TIME, REMOVE_MAX_TIME } from "../actions";
import { type, diet, intolerance } from "./preferenceData";

function SelectPreference() {
  const state = useSelector((state) => state.preferences);
  const dispatch = useDispatch();
  const [activeCategory, setActiveCategory] = useState(null);

  const handlePreferenceChange = (preferenceType, preferenceValue) => {
    if (state[preferenceType].includes(preferenceValue)) {
      dispatch({ type: REMOVE_PREFERENCE, payload: { preferenceType, preferenceValue } });
    } else {
      dispatch({ type: ADD_PREFERENCE, payload: { preferenceType, preferenceValue } });
    }
  };

  const handleMaxTimeChange = (event) => {
    const value = event.target.value;
    if (value >= 10 && value <= 200) {
      dispatch({ type: SET_MAX_TIME, payload: value });
    } else {
      dispatch({ type: REMOVE_MAX_TIME });
    }
  };

  const toggleCategory = (category) => {
    setActiveCategory(activeCategory === category ? null : category);
  };

  const renderDetails = () => {
    if (activeCategory === null) return null;

    switch (activeCategory) {
      case "type":
        return (
          <PreferenceDetails
            items={type}
            selectedItems={state.type}
            onItemClick={(item) => handlePreferenceChange("type", item)}
          />
        );
      case "diet":
        return (
          <PreferenceDetails
            items={diet}
            selectedItems={state.diet}
            onItemClick={(item) => handlePreferenceChange("diet", item)}
          />
        );
      case "intolerance":
        return (
          <PreferenceDetails
            items={intolerance}
            selectedItems={state.intolerance}
            onItemClick={(item) => handlePreferenceChange("intolerance", item)}
          />
        );
      case "maxTime":
        return (
          <input
            name="maxTime"
            type="number"
            min={10}
            max={200}
            value={state.maxTime || ""}
            className="border-2 border-gray-600 w-full px-2 outline-none mt-2"
            onChange={handleMaxTimeChange}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-4 w-full custom-scrollbar" style={{ overflowY: "scroll", maxHeight: "400px" }}>
      <div className="flex flex-col sm:flex-row md:justify-evenly justify-between mb-4">
        <PreferenceCategory
          icon={FaUtensils}
          label="Type"
          isActive={activeCategory === "type"}
          onClick={() => toggleCategory("type")}
        />
        <PreferenceCategory
          icon={FaLeaf}
          label="Diet"
          isActive={activeCategory === "diet"}
          onClick={() => toggleCategory("diet")}
        />
        <PreferenceCategory
          icon={FaExclamationTriangle}
          label="Intolerance"
          isActive={activeCategory === "intolerance"}
          onClick={() => toggleCategory("intolerance")}
        />
        <PreferenceCategory
          icon={FaClock}
          label="Max-Time"
          isActive={activeCategory === "maxTime"}
          onClick={() => toggleCategory("maxTime")}
        />
      </div>
      <div className="mt-4 md:px-16">{renderDetails()}</div>
    </div>
  );
}

export default SelectPreference;
