import { css } from "aphrodite";
import { formField } from "../styles/AuthStyle";
import React, { useState, useEffect } from "react";
import { validEmail, validPassword, validUsername } from "../utils/validation";
import { FaEye, FaEyeSlash } from 'react-icons/fa';


function Signup({onSubmit, error, toLogIn, toSignUp, alreadyHaveAcc}) {
    const [formData, setFormData] = useState({
        username: '',email: '', password: '', repassword: '', enableSubmit: false, showPassword: [false,false]
    });
    const [signupError, setSignupError] = useState('')

    const handleTogglePasswordVisibility = (index) => {
        const updatedPassword = [...formData.showPassword];
        updatedPassword[index] = !updatedPassword[index];
        setFormData({ ...formData, showPassword: updatedPassword});
    };
    const handleSignupSubmit = (e) => {
        e.preventDefault();
        if (!validUsername.test(formData.username)){
            setSignupError('UserName length >5 Letter, Number, -, _');
            return;
        }
        else if (!validEmail.test(formData.email)) {
            setSignupError('Invalid Email');
            return;
        }
        else if (!validPassword.test(formData.password)){
            error = ''
            setSignupError('Password length >6 Letter(begin UpperCase), Number, Special characters');
            return;
        }
        setSignupError('')
        onSubmit(formData);
    };

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

  
    useEffect(() => {
        if (formData.username !== '' && formData.password !== '' &&
            formData.email !== '' && formData.repassword !== '') {
            setFormData({ ...formData, enableSubmit: true});
        }
        else {
            if (formData.enableSubmit !== false) {
                setFormData({ ...formData, enableSubmit: false});
            }
        }
        
    }, [formData]);

    return(
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
                autocomplete={false}
                onChange={handleChange}
                className="w-3/4 text-sm outline-none bg-white border-b border-b-stone-400"></input>
            <div className="flex w-3/4 bg-white border-b border-stone-400">
                <input
                id='password'
                name="password"
                type={formData.showPassword[0] ? 'text' : 'password'}
                placeholder='Password'
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
                <input
                type='submit'
                value='SignUp'
                disabled={!formData.enableSubmit}
                className="bg-[#2de336] text-white px-1 rounded-lg my-4"></input>
        </form>
        </div>
    );
}



export default Signup;