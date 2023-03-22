import React from "react";
import logo from '../assets/logo.jpg';
import { StyleSheet, css } from "aphrodite";

function Header() {
    return(
        <>
            <header className={css(headerStyle.whole)}>
                <img src={logo} alt='logo' className={css(headerStyle.logo)}/>
            </header>
        </>
    );
}

const headerStyle = StyleSheet.create({
    logo: {
        width: '50px',
        float: 'left',
        margin: '7px 0 0 10px',
        borderRadius: '40%',
    },
    whole: {
        display: 'flex',
        flexDirection: 'column'
    }
})

export default Header;