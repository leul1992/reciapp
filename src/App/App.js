import './App.css';
import Signup from '../Authenticate/Signup';
import Header from '../Header/header';
import React from 'react';
import Footer from '../Footer/footer';
import './App.css'
import AuthComponent from '../Authenticate/loginSingup';



function App() {
  
  return (
    <React.Fragment>
      <Header />

      {/* <trialMode /> */}
      <AuthComponent />
        {/* <ParentComponent /> */}
      {/* <SelectPreference /> */}
      {/* <ShowRecipe /> */}
     {/*  <TryShowDetail /> */}
      {/* <TryShow /> */}
      {/* {<ShowRecipe />} */}
      
      {/* {<Login />} */}
      {/* <Signup /> */}
      {/* <div className="App">
        <h1>ReciApp</h1>
      </div> */}
    
      <Footer/>
    </React.Fragment>
  );
}


export default App;
