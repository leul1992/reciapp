import './App.css';
import Header from '../Header/header';
import React from 'react';
import Footer from '../Footer/footer';
import './App.css'
import AuthComponent from '../Authenticate/loginSingup';

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
