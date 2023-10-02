import useAuth from "./authenticate";
import Login from "./Login";
import Signup from "./Signup";
import { useState } from "react";
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
  
    

    const toSignUp = () => {
      setAlreadyHaveAcc(false);
    }
    const toLogIn = () => {
      setAlreadyHaveAcc(true);
    }
  
    return (
      <div>
        {authentication.isLoggedIn ? (
          <div>
            
            <ShowRecipe />
      </div>
    ) : (
      <div>
        {alreadyHaveAcc ?
        <Login
        toSignUp={toSignUp}
        toLogIn={toLogIn}
        alreadyHaveAcc={alreadyHaveAcc}
        onSubmit={handleLogin} error={authentication.error} />
        : <Signup
        toSignUp={toSignUp}
        toLogIn={toLogIn}
        alreadyHaveAcc={alreadyHaveAcc}
        onSubmit={handleSignup} error={authentication.error} />
}    
      </div>
    )}
  </div>
  );
  }

  

  export default AuthComponent;