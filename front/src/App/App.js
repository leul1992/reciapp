import './App.css';
import Header from '../Header/header';
import React from 'react';
import Footer from '../Footer/footer';
import './App.css'
import AuthComponent from '../Authenticate/loginSingup';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../Authenticate/Login';
import About_developer from '../about_developer';

function App() {

  
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<AuthComponent />} />
      <Route path="/login" element={<Login />} />
      <Route path="about_developer" element={<About_developer />} />
    </Routes>
    </BrowserRouter>
  );
}


export default App;
