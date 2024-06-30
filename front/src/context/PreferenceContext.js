import React, { createContext, useContext, useReducer } from "react";

const PreferencesContext = createContext();

const initialState = {
  type: [],
  diet: [],
  intolerance: [],
  maxTime: null,
};

function preferencesReducer(state, action) {
  switch (action.type) {
    case "ADD_PREFERENCE":
      return {
        ...state,
        [action.payload.preferenceType]: [
          ...state[action.payload.preferenceType],
          action.payload.preferenceValue,
        ],
      };
    case "REMOVE_PREFERENCE":
      return {
        ...state,
        [action.payload.preferenceType]: state[action.payload.preferenceType].filter(
          (value) => value !== action.payload.preferenceValue
        ),
      };
    case "SET_MAX_TIME":
      return { ...state, maxTime: action.payload };
    case "REMOVE_MAX_TIME":
      return { ...state, maxTime: null };
    default:
      return state;
  }
}

export function PreferencesProvider({ children }) {
  const [state, dispatch] = useReducer(preferencesReducer, initialState);

  return (
    <PreferencesContext.Provider value={{ state, dispatch }}>
      {children}
    </PreferencesContext.Provider>
  );
}

export function usePreferences() {
  const context = useContext(PreferencesContext);
  if (!context) {
    throw new Error("usePreferences must be used within a PreferencesProvider");
  }
  return context;
}
