import useAuth from "./authenticate";
import Login from "./Login";
import Signup from "./Signup";
// Usage in component
function AuthComponent() {
    const { authentication, signup, login, logout } = useAuth();
  
    const handleSignup = (formData) => {
      signup(formData);
    };
  
    const handleLogin = (formData) => {
      login(formData);
    };
  
    const handleLogout = () => {
      logout();
    };
  
    return (
      <div>
        {authentication.isLoggedIn ? (
          <div>
            <p>Welcome {authentication.user.username}!</p>
            <button onClick={handleLogout}>Logout</button>
      </div>
    ) : (
      <div>
        <Login onSubmit={handleLogin} error={authentication.error} />
        <Signup onSubmit={handleSignup} error={authentication.error} />
      </div>
    )}
  </div>
  );
  }

  export default AuthComponent;