import { StyleSheet } from 'aphrodite';
const coolFont = {
    fontFamily: "CoolFont",
    fontStyle: "normal",
    fontWeight: "bold",
    src: "url('coolfont.woff2') format('woff2')"
};

const formField = StyleSheet.create({
    form: {
        display: 'flex',
        color: '#d1f0e8',
        fontFamily: 'CoolFont',
        src: "url('coolfont.woff2') format('woff2')",
        alignItems: 'center',
        flexDirection: 'column',
    },


    label: {
        padding: '5px',
    },

    input : {
        textAlign: 'center',
        padding: '3px',
        width: "200px",
        background: 'rgba(67, 81, 99, 0.3)',
        borderRadius: '7px',
        margin: '3px',
        color: '#d1f0e8',
    },

    login : {
        textAlign: 'center',
        padding: '3px',
        width: "100px",
        background: 'rgba(67, 81, 99, 0.9)',
        borderRadius: '7px',
        margin: '3px',
        color: '#d1f0e8',
        cursor: 'pointer'
    },

    para: {
        textAlign: 'center',
        marginTop: '50px',
        marginBottom: '50px',
        fontSize: '25px',
        fontFamily: "CoolFont",
        font: {coolFont}
    },
    
    blueish: {
        color: '#d1f0e8',
        backgroundColor: '#37459e',
        borderRadius: '5px',
        margin: '4px',
        cursor: 'default'
    },
    greenish: {
        color: '#d1f0e8',
        backgroundColor: '#216333',
        borderRadius: '5px',
        margin: '4px',
        cursor: 'default',
    }    
});

export {formField, coolFont};