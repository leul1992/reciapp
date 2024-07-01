import React, { createContext, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const PreferenceContext = createContext();

export const usePreferences = () => {
  return useContext(PreferenceContext);
};

const PreferenceProvider = ({ children }) => {
  const state = useSelector((state) => state.preferences);
  const dispatch = useDispatch();

  return (
    <PreferenceContext.Provider value={{ state, dispatch }}>
      {children}
    </PreferenceContext.Provider>
  );
};

export default PreferenceProvider;
