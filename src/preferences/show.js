import React from "react";
import { useSelector } from "react-redux";
import { StyleSheet, css } from "aphrodite";
const Show = () => {
    const preferences = useSelector(state => state.preferences);
  
    return (
      <div className={css(styleShow.whole)}>
        {preferences.diet && <p>Preference Chosen:</p>}
        <ul>
          {preferences.type.map(type => (
            <li>{type}</li>
          ))}
            
          {preferences.diet.map(diet => (
            <li>{diet}</li>
          ))}
          {preferences.intolerance.map(intolerance => (
            <li>{intolerance}</li>
          ))}
        </ul>
        <p>{preferences.maxTime}</p>
      </div>
    );
}

const styleShow = StyleSheet.create({
  whole: {
    marginTop: '20px',
    border: '2px double rgba(24,55,12,0.4)',
    borderSpacing: '#999fc4',
  }
})

export default Show;
