/* import './Auth.css'; */
import React, { useState, useEffect } from 'react';
import { formField } from '../styles/AuthStyle';
import { css } from 'aphrodite';
import PropTypes from 'prop-types';
import { propsWithKeysAndRef } from '@cfaester/enzyme-adapter-react-18/dist/enzyme-adapter-utils';




function Login({onSubmit, error}) {
    
    const [formData, setFormData] = useState({ username: '', password: '', enableSubmit: false, showPassword: false });
    
    const handleTogglePasswordVisibility = () => {
        setFormData({ ...formData, showPassword: !formData.showPassword});
    };

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
        };

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    useEffect(() => {
        if (formData.username !== '' && formData.password !== '') {
            setFormData({ ...formData, enableSubmit: true});
        }
        else {
            if (formData.enableSubmit !== false) {
                setFormData({ ...formData, enableSubmit: false});
            }
        }
    }, [formData.username, formData.password, formData.enableSubmit]);

    return (
        <React.Fragment>
            <form onSubmit={handleLoginSubmit}
            className={css(formField.form)}>
            <p className={css(formField.para)}>LogIn Page</p>
            {error && <p>{error}</p>}
                <label htmlFor='username' className={css(formField.label)}>UserName
                </label>
                <input
                type='text' 
                id='username' 
                name='username' 
                value={formData.username} 
                onChange={handleChange} 
                className={css(formField.input)}
                ></input>
                <label htmlFor='password' className={css(formField.label)}>PassWord
                </label>
                <input
                id='password' 
                name='password' 
                type={formData.showPassword ? 'text' : 'password'} 
                value={formData.password} 
                onChange={handleChange} 
                className={css(formField.input)}
                ></input>
                <p
                onClick={handleTogglePasswordVisibility}
                className={css(formData.showPassword ? formField.greenish : formField.blueish)}
                >
                    {formData.showPassword ? 'Hide' : 'Show'}
                </p>
                <input
                type='submit'
                value='logIn'
                disabled={!formData.enableSubmit}
                className={css(formField.login)}
                ></input>
            </form>
        </React.Fragment>
    );
}



export default Login;