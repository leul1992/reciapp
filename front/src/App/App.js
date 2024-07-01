import './App.css';
import React from 'react';
import AuthComponent from '../Authenticate/loginSingup';import { BrowserRouter, Routes, Route } from 'react-router-dom';
import About_developer from '../about_developer';
import PreferenceProvider, { usePreferences } from '../context/PreferenceContext';

function App() {
  return (
    <BrowserRouter>
      <PreferenceProvider>
        <Routes>
          <Route path='/' element={<AuthComponent />} />
          {/* <Route path="/login" element={<Login />} /> */}
          <Route path="/about_developer" element={<About_developer />} />
        </Routes>
      </PreferenceProvider>
    </BrowserRouter>
  );
}

export default App;
