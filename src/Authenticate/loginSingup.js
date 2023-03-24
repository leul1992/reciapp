import useAuth from "./authenticate";
import Login from "./Login";
import Signup from "./Signup";
import { useState } from "react";
import { StyleSheet, css } from "aphrodite";
import ShowRecipe from "../ShowRecipe/showrecipe";
// Usage in component
function AuthComponent() {
    const { authentication, signup, login, logout } = useAuth();
    const [alreadyHaveAcc, setAlreadyHaveAcc] = useState(true);
  
    const handleSignup = (formData) => {
      signup(formData);
    };
  
    const handleLogin = (formData) => {
      login(formData);
    };
  
    const handleLogout = () => {
      logout();
    };

    const handleAlreadyHaveAcc = () => {
      setAlreadyHaveAcc(!alreadyHaveAcc);
    }
  
    return (
      <div>
        {authentication.isLoggedIn ? (
          <div>
            <div>
              <p
              className={css(styleLogSing.welcome, styleLogSing.alreadyhave)}>Welcome {authentication.user.username}!</p>
              <div className={css(styleLogSing.logout)}>
                <button
                onClick={handleLogout}
                >Logout</button>
              </div>
            </div>
            <ShowRecipe />
      </div>
    ) : (
      <div>
        {alreadyHaveAcc ?
        <Login onSubmit={handleLogin} error={authentication.error} />
        : <Signup onSubmit={handleSignup} error={authentication.error} />
}
        <div
        className={css(styleLogSing.alreadyhave)}>
          <p>Go To </p>
          <p
          className={css(styleLogSing.element)}
        onClick={handleAlreadyHaveAcc}
        >{alreadyHaveAcc ? 'Signup':'Login' }</p>
        </div>
      </div>
    )}
  </div>
  );
  }

  const styleLogSing = StyleSheet.create({
    alreadyhave: {
      display: 'flex',
      fontSize: '20px',
      justifyContent: 'center'
    },
    element: {
      paddingLeft: '7px',
      cursor: 'pointer',
      color: 'rgb(144,132,122)'
    },
    welcome: {
      color: 'rgb(144,132,122)',
      cursor: 'default'
    },
    logout: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
    
  })

  export default AuthComponent;