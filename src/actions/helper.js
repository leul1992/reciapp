// Import necessary dependencies
import { useReducer } from 'react';

// Define initial state for reducer
const initialState = {
  user: null,
  isLoggedIn: false,
  error: null,
};

// Define action types
const actionTypes = {
  SIGNUP_SUCCESS: 'SIGNUP_SUCCESS',
  SIGNUP_ERROR: 'SIGNUP_ERROR',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_ERROR: 'LOGIN_ERROR',
  LOGOUT: 'LOGOUT',
};

// Define reducer function
function authReducer(state, action) {
  switch (action.type) {
    case actionTypes.SIGNUP_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isLoggedIn: true,
        error: null,
      };
    case actionTypes.SIGNUP_ERROR:
      return {
        ...state,
        user: null,
        isLoggedIn: false,
        error: action.payload,
      };
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isLoggedIn: true,
        error: null,
      };
    case actionTypes.LOGIN_ERROR:
      return {
        ...state,
        user: null,
        isLoggedIn: false,
        error: action.payload,
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        user: null,
        isLoggedIn: false,
        error: null,
      };
    default:
      return state;
  }
}

// Define custom hooks for auth state and dispatch
function useAuth() {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Define signup function to dispatch signup action
  const signup = async (formData) => {
    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      if (data.success) {
        dispatch({ type: actionTypes.SIGNUP_SUCCESS, payload: data.user });
      } else {
        dispatch({ type: actionTypes.SIGNUP_ERROR, payload: data.error });
      }
    } catch (error) {
      dispatch({ type: actionTypes.SIGNUP_ERROR, payload: error.message });
    }
  };

  // Define login function to dispatch login action
  const login = async (formData) => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      if (data.success) {
        dispatch({ type: actionTypes.LOGIN_SUCCESS, payload: data.user });
      } else {
        dispatch({ type: actionTypes.LOGIN_ERROR, payload: data.error });
      }
    } catch (error) {
      dispatch({ type: actionTypes.LOGIN_ERROR, payload: error.message });
    }
  };

  // Define logout function to dispatch logout action
  const logout = () => {
    dispatch({ type: actionTypes.LOGOUT });
  };

  return {
    state,
    signup,
    login,
    logout,
  };
}

// Usage in component
function AuthComponent() {
  const { state, signup, login, logout } = useAuth();

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
      {state.isLoggedIn ? (
        <div>
          <p>Welcome {state.user.username}!</p>
          <button onClick={handleLogout}>Logout</button>
    </div>
  ) : (
    <div>
      <SignupForm onSubmit={handleSignup} error={state.error} />
      <LoginForm onSubmit={handleLogin} error={state.error} />
    </div>
  )}
</div>
);
}

// Example SignupForm component
function SignupForm({ onSubmit, error }) {
const [formData, setFormData] = useState({ username: '', password: '' });

const handleSubmit = (event) => {
event.preventDefault();
onSubmit(formData);
};

const handleChange = (event) => {
setFormData({ ...formData, [event.target.name]: event.target.value });
};

return (
<form onSubmit={handleSubmit}>
<h2>Sign up</h2>
{error && <p>{error}</p>}
<div>
<label>Username:</label>
<input
       type="text"
       name="username"
       value={formData.username}
       onChange={handleChange}
     />
</div>
<div>
<label>Password:</label>
<input
       type="password"
       name="password"
       value={formData.password}
       onChange={handleChange}
     />
</div>
<button type="submit">Sign up</button>
</form>
);
}

// Example LoginForm component
function LoginForm({ onSubmit, error }) {
const [formData, setFormData] = useState({ username: '', password: '' });

const handleSubmit = (event) => {
event.preventDefault();
onSubmit(formData);
};

const handleChange = (event) => {
setFormData({ ...formData, [event.target.name]: event.target.value });
};

return (
<form onSubmit={handleSubmit}>
<h2>Login</h2>
{error && <p>{error}</p>}
<div>
<label>Username:</label>
<input
       type="text"
       name="username"
       value={formData.username}
       onChange={handleChange}
     />
</div>
<div>
<label>Password:</label>
<input
       type="password"
       name="password"
       value={formData.password}
       onChange={handleChange}
     />
</div>
<button type="submit">Login</button>
</form>
);
}