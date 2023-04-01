import { StyleSheet } from 'aphrodite';
const coolFont = {
    fontFamily: "CoolFont",
    fontStyle: "normal",
    fontWeight: "bold",
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
        background: 'rgba(240, 240, 240, 0.1)',
        borderRadius: '7px',
        margin: '3px',
        color: '#a1f0ef',
        fontSize: '14px',
        border: '1px solid',
        borderTopColor: 'yellow',
        outline: 'none',
        transition: '0.5s',
        
        ':focus':{
            borderTopColor: 'green',
        },
       
        
    },

    login : {
        textAlign: 'center',
        padding: '3px',
        width: "79px",
        background: 'rgba(67, 81, 99, 0.1)',
        borderRadius: '7px',
        margin: '5px',
        color: '#d1f0e8',
        cursor: 'pointer',
        transition: '0.5s',
        ':hover': {
            width: '85px',
            fontSize: '14px'
        }
    },

    para: {
        textAlign: 'center',
        marginTop: '50px',
        marginBottom: '50px',
        fontSize: '25px',
        fontFamily: "CoolFont",
        font: {coolFont}
    },
    
    show: {
        color: '#d1f0e8',
        borderRadius: '5px',
        margin: '5px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        
      },
      hide: {
        margin: '6px',
      },
      
    inputshow: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginLeft: '30px',
        background: 'rgba(152, 156, 109, 0.07)',
        borderRadius: '7px',
        padding: '3px',
      }
        
});

export {formField, coolFont};