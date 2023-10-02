/* import './Auth.css'; */
import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { validPassword, validUsername } from '../utils/validation';



function Login({onSubmit, error, alreadyHaveAcc, toSignUp, toLogIn}) {
    
    const [formData, setFormData] = useState({ username: '', password: '', showPassword: false });
    const [loginError, setLoginError] = useState('');
    
    const handleTogglePasswordVisibility = () => {
        setFormData({ ...formData, showPassword: !formData.showPassword});
    };

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
        };

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        if (!validUsername.test(formData.username) && formData.username){
            error = ''
            setLoginError('UserName length >5 Letter, Number, -, _');
            return;
        }
        else if (!validPassword.test(formData.password) && formData.password){
            error = ''
            setLoginError('Password length >6 Letter(begin UpperCase), Number, Special characters');
            return;
        }
        setLoginError('')
        onSubmit(formData);
    };

    

    return (
        <div className="flex justify-center px-10 sm:px-0 items-center h-screen">
            <form
            autoComplete='off'
            onSubmit={handleLoginSubmit}
            className="flex w-full sm:w-96 gap-8 py-10 items-center flex-col border rounded-br-xl rounded-tl-xl drop-shadow-md outline outline-2 outline-green-300"
            >
          <div className="flex cursor-pointer bg-stone-100 rounded-xl w-32">
              <span className={`px-1 flex justify-center w-1/2 outline-none rounded-xl ${alreadyHaveAcc ? "bg-[#2de336] text-white":"text-black"}`}
                onClick={toLogIn}
                      >Login</span>
                      <span
                      onClick={toSignUp}
                      className={`${!alreadyHaveAcc ? "bg-[#2de336] text-white":"text-black"} flex rounded-xl justify-center w-1/2`}>
                        Signup</span>
          </div>
       
            {(!loginError && error) && <p className="text-red-400">{error}</p>}
            {loginError && <div className="bg-red-400">{loginError}</div>}
                <input
                type='text' 
                id='username'
                name='username' 
                placeholder='Username'
                autoComplete={false}
                onChange={handleChange}
                className="w-3/4 text-sm outline-none bg-white border-b border-b-stone-400"
                ></input>
                <div className="flex w-3/4 bg-white border-b border-stone-400">
                    <input
                    id='password'
                    name='password'
                    placeholder='Password'
                    type={formData.showPassword ? 'text' : 'password'}
                    onChange={handleChange}
                    className="w-11/12 text-sm outline-none"
                    ></input>
                    <span
                    onClick={handleTogglePasswordVisibility}
                    className="text-stone-400 cursor-pointer"
                    >
                        {formData.showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                </div>
                <input
                type='submit'
                value='LogIn'
                className="bg-[#2de336] mb-4 text-white px-2 rounded-xl cursor-pointer hover:bg-green-600"
                ></input>
            </form>
        </div>
    );
}



export default Login;
