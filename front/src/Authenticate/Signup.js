import React, { useState } from "react";
import { validPassword, validUsername } from "../utils/validation";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function Signup({ onSubmit, error, toLogIn, toSignUp, alreadyHaveAcc }) {
  const [formData, setFormData] = useState({
    username: '', password: '', repassword: '', showPassword: [false, false]
  });
  const [signupError, setSignupError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleTogglePasswordVisibility = (index) => {
    const updatedPassword = [...formData.showPassword];
    updatedPassword[index] = !updatedPassword[index];
    setFormData({ ...formData, showPassword: updatedPassword });
  };

// Update your Signup component
const handleSignupSubmit = async (e) => {
    e.preventDefault();
    if (!validUsername.test(formData.username)) {
      setSignupError('UserName length >5 Letter, Number, -, _');
      return;
    } else if (!validPassword.test(formData.password)) {
      setSignupError('Password length >6 Letter(begin UpperCase), Number, Special characters');
      return;
    }
  
    setSignupError('');
    setIsLoading(true);
  
    try {
      // Wrap the asynchronous code in a promise
      await onSubmit(formData);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      // Handle the error here, e.g., set an error state.
    }
  };
  
  

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        autoComplete="off"
        onSubmit={handleSignupSubmit}
        className="flex w-full sm:w-96 gap-8 py-10 items-center flex-col border rounded-br-xl rounded-tl-xl drop-shadow-md outline outline-2 outline-green-300"
      >
            <div className="flex cursor-pointer bg-stone-100 rounded-xl w-32">
              <span className={`px-1 flex justify-center w-1/2 rounded-xl ${alreadyHaveAcc ? "bg-[#2de336] text-white":"text-black"}`}
                onClick={toLogIn}
                      >Login</span>
                <span
                    onClick={toSignUp}
                    className={`${!alreadyHaveAcc ? "bg-[#2de336] text-white":"text-black"} rounded-xl flex justify-center w-1/2`}>Signup</span>
          </div>
        {(!signupError && error) && <p className="text-red-400">{error}</p>}
        {signupError && <div className="text-red-400">{signupError}</div>}
                <input
                type='text'
                id='username'
                name="username"
                placeholder='Username'
                autocomplete="off"
                onChange={handleChange}
                className="w-3/4 text-sm outline-none bg-white border-b border-b-stone-400"></input>
            <div className="flex w-3/4 bg-white border-b border-stone-400">
                <input
                id='password'
                name="password"
                type={formData.showPassword[0] ? 'text' : 'password'}
                placeholder='Password'
                autoComplete="off"
                onChange={handleChange}
                className="w-11/12 text-sm outline-none"></input>
                <span
                    onClick={()=>handleTogglePasswordVisibility(0)}
                    className="text-stone-400 cursor-pointer"
                    >
                        {formData.showPassword[0] ? <FaEyeSlash /> : <FaEye />}
                    </span>
                </div>
                <div className="flex w-3/4 bg-white border-b border-stone-400">
                <input
                type={formData.showPassword[1] ? 'text' : 'password'}
                id='repassword'
                placeholder='ReEnter Password'
                autoComplete="off"
                name="repassword"
                onChange={handleChange}
                className="w-11/12 text-sm outline-none"></input>
                <span
                    onClick={()=>handleTogglePasswordVisibility(1)}
                    className="text-stone-400 cursor-pointer"
                    >
                        {formData.showPassword[1] ? <FaEyeSlash /> : <FaEye />}
                    </span>
                </div>
                {isLoading ? (
          <div className="text-center">
            Loading... {/* You can replace this with your loading icon or component */}
          </div>
        ) : (
          <input
            type='submit'
            value='SignUp'
            className="bg-[#2de336] text-white px-1 cursor-pointer hover:bg-green-600 rounded-lg my-4"
          />
        )}
      </form>
    </div>
  );
}

export default Signup;