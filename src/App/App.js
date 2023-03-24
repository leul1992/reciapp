import './App.css';
import Signup from '../Authenticate/Signup';
import Header from '../Header/header';
import React from 'react';
import Footer from '../Footer/footer';
import './App.css'
import AuthComponent from '../Authenticate/loginSingup';
import ShowRecipe from '../ShowRecipe/showrecipe';
import { useSelector } from 'react-redux';
import useAuth from '../Authenticate/authenticate';


function App() {

  
  return (
    <React.Fragment>
      <Header />
      <AuthComponent />
      <Footer/>
    </React.Fragment>
  );
}


export default App;
